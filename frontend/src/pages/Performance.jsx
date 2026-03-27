import Sidebar from "../components/Sidebar";
import EquityChart from "../components/EquityChart";
import ProfitHeatmap from "../components/ProfitHeatmap";
import TradeDistribution from "../components/TradeDistribution";
import GeographyAnalysis from "../components/GeographyAnalysis";
import { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function Performance() {

  const API = "https://tradejournal-backend-uwpp.onrender.com";
  const token = localStorage.getItem("token");

  // FIX 11: Group by tradeType (BUY/SELL) since strategy field doesn't exist
  const [tradeTypeData, setTradeTypeData] = useState({});
  const [stats, setStats] = useState({ bestDay: 0, worstDay: 0 });

  useEffect(() => {

    // FIX 9: Fetch from backend instead of localStorage
    const fetchTrades = async () => {

      try {

        const res = await axios.get(`${API}/api/trades`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const trades = res.data;

        if (trades.length === 0) return;

        // Group PnL by tradeType (BUY / SELL)
        const typePnL = {};

        trades.forEach(trade => {
          const key = trade.tradeType || "UNKNOWN";
          if (!typePnL[key]) typePnL[key] = 0;
          typePnL[key] += trade.profitLoss;
        });

        setTradeTypeData(typePnL);

        // Daily stats using tradeDate
        const daily = {};

        trades.forEach(trade => {
          const date = trade.tradeDate || "unknown";
          if (!daily[date]) daily[date] = 0;
          daily[date] += trade.profitLoss;
        });

        const dailyValues = Object.values(daily);

        setStats({
          bestDay: Math.max(...dailyValues),
          worstDay: Math.min(...dailyValues)
        });

      } catch (err) {
        console.error("Performance fetch error:", err);
      }

    };

    fetchTrades();

  }, []);

  const barChart = {
    labels: Object.keys(tradeTypeData),
    datasets: [
      {
        label: "PnL by Trade Type",
        data: Object.values(tradeTypeData),
        backgroundColor: "#22c55e"
      }
    ]
  };

  return (

    <div className="flex bg-gray-900 min-h-screen">

      <Sidebar />

      <div className="flex-1 p-6">

        <h1 className="text-2xl text-white mb-6">Performance</h1>

        <div className="grid md:grid-cols-2 gap-6 mb-6">

          <div className="bg-gray-800 p-5 rounded-xl">
            <h3 className="text-gray-400 text-sm">Best Day</h3>
            <p className="text-green-400 text-2xl font-bold">
              ₹{stats.bestDay.toFixed(2)}
            </p>
          </div>

          <div className="bg-gray-800 p-5 rounded-xl">
            <h3 className="text-gray-400 text-sm">Worst Day</h3>
            <p className="text-red-400 text-2xl font-bold">
              ₹{stats.worstDay.toFixed(2)}
            </p>
          </div>

        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6 items-start">

          <div className="bg-gray-800 p-5 rounded-xl shadow h-[320px]">
            <h2 className="text-white text-lg mb-3">Monthly Profit Heatmap</h2>
            <ProfitHeatmap />
          </div>

          <div className="bg-gray-800 p-5 rounded-xl shadow h-[320px]">
            <h2 className="text-white text-lg mb-3">Trade Distribution</h2>
            <TradeDistribution />
          </div>

        </div>

        {/* FIX 11: Renamed from "Strategy Performance" to "Trade Type Performance" */}
        <div className="bg-gray-800 p-5 rounded-xl shadow mb-6">
          <h2 className="text-white text-lg mb-4">Trade Type Performance</h2>
          <Bar data={barChart} />
        </div>

        <div className="mb-6">
          <h2 className="text-white text-lg mb-4">Geography Analysis</h2>
          <GeographyAnalysis />
        </div>

        <EquityChart />

      </div>

    </div>

  );

}

export default Performance;