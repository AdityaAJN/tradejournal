import { useEffect, useState } from "react";
import axios from "axios";

function TradeTable() {

  const API = "https://tradejournal-backend-uwpp.onrender.com";
  const token = localStorage.getItem("token");

  const [trades, setTrades] = useState([]);

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
      fetchTrades();
    } catch (err) {
      console.error(err);
    }
  };

  return (

    <div>

      <h2 className="text-white text-xl mb-3">Trades</h2>

      <table className="w-full text-white bg-gray-800 rounded-xl overflow-hidden">

        <thead className="bg-gray-700">
          <tr>
            <th className="p-2">Symbol</th>
            {/* FIX 11: Added TradeType and Date columns which exist; removed Strategy which doesn't */}
            <th className="p-2">Type</th>
            <th className="p-2">Date</th>
            <th className="p-2">Entry</th>
            <th className="p-2">Exit</th>
            <th className="p-2">Qty</th>
            <th className="p-2">P&amp;L</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>

        <tbody>
          {trades.map(trade => (
            <tr key={trade.id} className="hover:bg-gray-700 text-center">
              <td className="p-2">{trade.symbol}</td>
              <td className={`p-2 font-semibold ${trade.tradeType === "BUY" ? "text-green-400" : "text-red-400"}`}>
                {trade.tradeType}
              </td>
              <td className="p-2">{trade.tradeDate}</td>
              <td className="p-2">{trade.entryPrice}</td>
              <td className="p-2">{trade.exitPrice ?? "—"}</td>
              <td className="p-2">{trade.quantity}</td>
              <td className={`p-2 font-semibold ${trade.profitLoss >= 0 ? "text-green-400" : "text-red-400"}`}>
                ₹{trade.profitLoss?.toFixed(2)}
              </td>
              <td className="p-2">
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