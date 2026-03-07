import { useEffect, useState } from "react";
import axios from "axios";

const API = "https://tradejournal-backend-uwpp.onrender.com";

function TradeTable() {

  const [trades, setTrades] = useState([]);
  const [filter, setFilter] = useState("ALL");

  const token = localStorage.getItem("token");

  const headers = {
    Authorization: `Bearer ${token}`
  };

  useEffect(() => {
    fetchTrades();
  }, []);

  const fetchTrades = async () => {
    try {
      const res = await axios.get(`${API}/api/trades`, { headers });
      setTrades(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTrade = async (id) => {

    try {

      await axios.delete(`${API}/api/trades/${id}`, { headers });

      setTrades(trades.filter(t => t.id !== id));

    } catch (err) {

      console.error(err);

    }

  };

  const clearAllTrades = async () => {

    try {

      await axios.delete(`${API}/api/trades`, { headers });

      setTrades([]);

    } catch (err) {

      console.error(err);

    }

  };

  let filteredTrades = trades;

  if (filter === "WIN")
    filteredTrades = trades.filter(t => t.pnl > 0);

  if (filter === "LOSS")
    filteredTrades = trades.filter(t => t.pnl < 0);

  return (

    <div>

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

      <div className="mb-4 flex gap-3">

        <button
          className="bg-yellow-600 px-3 py-1 rounded"
          onClick={clearAllTrades}
        >
          Clear All Trades
        </button>

      </div>

      <table className="w-full text-white bg-gray-800 rounded-xl overflow-hidden">

        <thead className="bg-gray-700">

          <tr>
            <th className="p-2">Symbol</th>
            <th className="p-2">Entry</th>
            <th className="p-2">Qty</th>
            <th className="p-2">Exit</th>
            <th className="p-2">PnL</th>
            <th className="p-2">Action</th>
          </tr>

        </thead>

        <tbody>

          {filteredTrades.map(trade => (

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
                {trade.pnl?.toFixed(2)}
              </td>

              <td className="text-center">

                <button
                  className="bg-red-500 px-3 py-1 rounded"
                  onClick={() => deleteTrade(trade.id)}
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