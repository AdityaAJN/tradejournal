import { useEffect, useState } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function TradeDistribution() {

  const API = "https://tradejournal-backend-uwpp.onrender.com";
  const token = localStorage.getItem("token");

  const [wins, setWins]     = useState(0);
  const [losses, setLosses] = useState(0);

  useEffect(() => {

    // FIX 9: Fetch trades from backend instead of localStorage
    const fetchTrades = async () => {

      try {

        const res = await axios.get(`${API}/api/trades`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const trades = res.data;

        setWins(trades.filter(t => t.profitLoss > 0).length);
        setLosses(trades.filter(t => t.profitLoss < 0).length);

      } catch (err) {
        console.error("TradeDistribution fetch error:", err);
      }

    };

    fetchTrades();

  }, []);

  const data = {
    labels: ["Winning Trades", "Losing Trades"],
    datasets: [
      {
        data: [wins, losses],
        backgroundColor: ["#22c55e", "#ef4444"],
        borderWidth: 1
      }
    ]
  };

  return (

    <div className="bg-gray-800 p-6 rounded-xl mt-6">

      <h2 className="text-white text-xl mb-4">
        Trade Distribution
      </h2>

      <div className="w-full h-[230px]">
        <Pie data={data} options={{ maintainAspectRatio: false }} />
      </div>

    </div>

  );

}

export default TradeDistribution;