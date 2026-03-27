import { useEffect, useState } from "react";
import axios from "axios";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function GeographyAnalysis() {

  const API = "https://tradejournal-backend-uwpp.onrender.com";
  const token = localStorage.getItem("token");

  const [geoCount, setGeoCount] = useState({ NATIONAL: 0, INTERNATIONAL: 0 });
  const [geoPnL, setGeoPnL]     = useState({ NATIONAL: 0, INTERNATIONAL: 0 });

  useEffect(() => {

    const fetchTrades = async () => {

      try {

        const res = await axios.get(`${API}/api/trades`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const trades = res.data;

        const count = { NATIONAL: 0, INTERNATIONAL: 0 };
        const pnl   = { NATIONAL: 0, INTERNATIONAL: 0 };

        trades.forEach(trade => {
          const geo = trade.marketGeography || "NATIONAL";
          count[geo] = (count[geo] || 0) + 1;
          pnl[geo]   = (pnl[geo]   || 0) + (trade.profitLoss || 0);
        });

        setGeoCount(count);
        setGeoPnL(pnl);

      } catch (err) {
        console.error("GeographyAnalysis fetch error:", err);
      }

    };

    fetchTrades();

  }, []);

  const pieData = {
    labels: ["National", "International"],
    datasets: [
      {
        data: [geoCount.NATIONAL, geoCount.INTERNATIONAL],
        backgroundColor: ["#3b82f6", "#f59e0b"],
        borderWidth: 1
      }
    ]
  };

  const barData = {
    labels: ["National", "International"],
    datasets: [
      {
        label: "PnL by Geography",
        data: [geoPnL.NATIONAL, geoPnL.INTERNATIONAL],
        backgroundColor: ["#3b82f6", "#f59e0b"]
      }
    ]
  };

  return (

    <div className="grid md:grid-cols-2 gap-6 mb-6 items-start">

      <div className="bg-gray-800 p-5 rounded-xl shadow h-[320px]">
        <h2 className="text-white text-lg mb-3">Trade Count by Geography</h2>
        <div className="w-full h-[240px]">
          <Pie data={pieData} options={{ maintainAspectRatio: false }} />
        </div>
      </div>

      <div className="bg-gray-800 p-5 rounded-xl shadow h-[320px]">
        <h2 className="text-white text-lg mb-3">PnL by Geography</h2>
        <div className="w-full h-[240px]">
          <Bar data={barData} options={{ maintainAspectRatio: false }} />
        </div>
      </div>

    </div>

  );

}

export default GeographyAnalysis;
