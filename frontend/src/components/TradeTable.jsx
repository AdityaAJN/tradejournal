import { useEffect, useState } from "react";

function TradeTable() {

  const [trades, setTrades] = useState([]);
  const [filter, setFilter] = useState("ALL");
  const [livePrices, setLivePrices] = useState({});

  const API_KEY = "d6lj43pr01qrq6i2v060d6lj43pr01qrq6i2v06g";

  useEffect(() => {

    const storedTrades =
      JSON.parse(localStorage.getItem("trades")) || [];

    setTrades(storedTrades);

    fetchLivePrices(storedTrades);

  }, []);

  // FETCH LIVE PRICES FOR OPEN TRADES
  const fetchLivePrices = async (trades) => {

    const openTrades = trades.filter(t => t.status === "OPEN");

    for (let trade of openTrades) {

      try {

        const res = await fetch(
          `https://finnhub.io/api/v1/quote?symbol=${trade.symbol}&token=${API_KEY}`
        );

        const data = await res.json();

        setLivePrices(prev => ({
          ...prev,
          [trade.symbol]: data.c
        }));

      } catch (err) {

        console.error("Live price error", err);

      }

    }

  };

  // OPEN TRADES
  const openTrades = trades.filter(t => t.status === "OPEN");

  // CLOSED TRADES
  let closedTrades = trades.filter(t => t.status !== "OPEN");

  if (filter === "WIN") closedTrades = closedTrades.filter(t => t.pnl > 0);
  if (filter === "LOSS") closedTrades = closedTrades.filter(t => t.pnl < 0);

  const deleteTrade = (id) => {

    const updatedTrades = trades.filter(t => t.id !== id);

    localStorage.setItem("trades", JSON.stringify(updatedTrades));

    window.location.reload();

  };

  // EXPORT CSV
  const exportCSV = () => {

    if (trades.length === 0) {
      alert("No trades to export");
      return;
    }

    const headers = [
      "Symbol",
      "Entry",
      "Quantity",
      "Exit",
      "StopLoss",
      "Target",
      "PnL",
      "RR",
      "Strategy",
      "Notes"
    ];

    const rows = trades.map(t => [
      t.symbol,
      t.entryPrice,
      t.quantity,
      t.exitPrice,
      t.stopLoss,
      t.target,
      t.pnl,
      t.rr,
      t.strategy,
      t.notes
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);

    const link = document.createElement("a");

    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "trades.csv");

    document.body.appendChild(link);

    link.click();

  };

  return (

    <div>

      {/* OPEN POSITIONS */}
      {openTrades.length > 0 && (

        <div className="mb-6">

          <h2 className="text-white text-xl mb-3">
            Open Positions
          </h2>

          <table className="w-full text-white bg-gray-800 rounded-xl overflow-hidden">

            <thead className="bg-gray-700">

              <tr>
                <th className="p-2 text-center">Symbol</th>
                <th className="p-2 text-center">Entry</th>
                <th className="p-2 text-center">Qty</th>
                <th className="p-2 text-center">Live Price</th>
                <th className="p-2 text-center">Live PnL</th>
              </tr>

            </thead>

            <tbody>

              {openTrades.map(trade => {

                const livePrice = livePrices[trade.symbol];

                const pnl =
                  livePrice
                    ? (livePrice - trade.entryPrice) * trade.quantity
                    : 0;

                return (

                  <tr key={trade.id} className="hover:bg-gray-700">

                    <td className="text-center">{trade.symbol}</td>

                    <td className="text-center">{trade.entryPrice}</td>

                    <td className="text-center">{trade.quantity}</td>

                    <td className="text-center">
                      {livePrice ? livePrice.toFixed(2) : "..."}
                    </td>

                    <td
                      className={
                        pnl >= 0
                          ? "text-green-400 text-center"
                          : "text-red-400 text-center"
                      }
                    >
                      {pnl.toFixed(2)}
                    </td>

                  </tr>

                );

              })}

            </tbody>

          </table>

        </div>

      )}

      {/* FILTER BUTTONS */}
      <div className="mb-4">

        <button
          className="bg-gray-700 px-3 py-1 mr-2 rounded"
          onClick={() => setFilter("ALL")}
        >
          All
        </button>

        <button
          className="bg-green-600 px-3 py-1 mr-2 rounded"
          onClick={() => setFilter("WIN")}
        >
          Winners
        </button>

        <button
          className="bg-red-600 px-3 py-1 rounded"
          onClick={() => setFilter("LOSS")}
        >
          Losers
        </button>

      </div>

      {/* ACTION BUTTONS */}
      <div className="mb-4 flex gap-3">

        <button
          className="bg-yellow-600 px-3 py-1 rounded"
          onClick={() => {
            localStorage.removeItem("trades");
            window.location.reload();
          }}
        >
          Clear All Trades
        </button>

        <button
          className="bg-blue-600 px-3 py-1 rounded"
          onClick={exportCSV}
        >
          Export CSV
        </button>

      </div>

      {/* CLOSED TRADES */}
      <h2 className="text-white text-xl mb-3">
        Closed Trades
      </h2>

      <table className="w-full text-white bg-gray-800 rounded-xl overflow-hidden">

        <thead className="bg-gray-700">
          <tr>
            <th className="p-2 text-center">Symbol</th>
            <th className="p-2 text-center">Entry</th>
            <th className="p-2 text-center">Qty</th>
            <th className="p-2 text-center">Exit</th>
            <th className="p-2 text-center">PnL</th>
            <th className="p-2 text-center">Strategy</th>
            <th className="p-2 text-center">Action</th>
          </tr>
        </thead>

        <tbody>

          {closedTrades.map(trade => (

            <tr key={trade.id} className="hover:bg-gray-700">

              <td className="text-center">{trade.symbol}</td>

              <td className="text-center">{trade.entryPrice}</td>

              <td className="text-center">{trade.quantity}</td>

              <td className="text-center">{trade.exitPrice}</td>

              <td
                className={
                  trade.pnl >= 0
                    ? "text-green-400 text-center"
                    : "text-red-400 text-center"
                }
              >
                {trade.pnl.toFixed(2)}
              </td>

              <td className="text-center">{trade.strategy}</td>

              <td className="text-center">

                <button
                  className="bg-red-500 px-3 py-1 rounded"
                  onClick={() => {
                    if (window.confirm("Delete this trade?")) {
                      deleteTrade(trade.id);
                    }
                  }}
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}

export default TradeTable;