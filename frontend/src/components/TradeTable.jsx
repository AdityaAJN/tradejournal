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

      const res = await axios.get(
        `${API}/api/trades`,
        { headers }
      );

      setTrades(res.data);

    } catch (err) {

      console.error(err);

    }

  };

  const deleteTrade = async (id) => {

    try {

      await axios.delete(
        `${API}/api/trades/${id}`,
        { headers }
      );

      fetchTrades();

    } catch (err) {

      console.error(err);

    }

  };

  return (

    <div>

      <h2 className="text-white text-xl mb-3">
        Trades
      </h2>

      <table className="w-full text-white bg-gray-800 rounded-xl overflow-hidden">

        <thead className="bg-gray-700">

          <tr>
            <th className="p-2">Symbol</th>
            <th className="p-2">Entry</th>
            <th className="p-2">Qty</th>
            <th className="p-2">Exit</th>
            <th className="p-2">Strategy</th>
            <th className="p-2">Action</th>
          </tr>

        </thead>

        <tbody>

          {trades.map(trade => (

            <tr key={trade.id} className="hover:bg-gray-700">

              <td className="text-center">{trade.symbol}</td>
              <td className="text-center">{trade.entryPrice}</td>
              <td className="text-center">{trade.quantity}</td>
              <td className="text-center">{trade.exitPrice}</td>
              <td className="text-center">{trade.strategy}</td>

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