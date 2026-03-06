import Sidebar from "../components/Sidebar";
import EquityChart from "../components/EquityChart";
import ProfitHeatmap from "../components/ProfitHeatmap";
import TradeDistribution from "../components/TradeDistribution";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

function Performance() {

  const [strategyData, setStrategyData] = useState({});
  const [stats, setStats] = useState({
    bestDay: 0,
    worstDay: 0
  });

  useEffect(() => {

    const trades =
      JSON.parse(localStorage.getItem("trades")) || [];

    if (trades.length === 0) return;

    // STRATEGY PERFORMANCE
    const strategyPnL = {};

    trades.forEach(trade => {

      if (!strategyPnL[trade.strategy]) {
        strategyPnL[trade.strategy] = 0;
      }

      strategyPnL[trade.strategy] += trade.pnl;

    });

    setStrategyData(strategyPnL);

    // DAILY STATS
    const daily = {};

    trades.forEach(trade => {

      const date = trade.timestamp
        ? trade.timestamp.slice(0,10)
        : "unknown";

      if (!daily[date]) daily[date] = 0;

      daily[date] += trade.pnl;

    });

    const dailyValues = Object.values(daily);

    const bestDay = Math.max(...dailyValues);
    const worstDay = Math.min(...dailyValues);

    setStats({
      bestDay,
      worstDay
    });

  }, []);

  const strategyChart = {

    labels: Object.keys(strategyData),

    datasets: [

      {
        label: "Strategy PnL",
        data: Object.values(strategyData),
        backgroundColor: "#22c55e"
      }

    ]

  };

  return (

    <div className="flex bg-gray-900 min-h-screen">

      <Sidebar />

      <div className="flex-1 p-6">

        <h1 className="text-2xl text-white mb-6">
          Performance
        </h1>

        {/* STATS */}
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

        {/* HEATMAP + DISTRIBUTION */}
        <div className="grid md:grid-cols-2 gap-6 mb-6 items-start">

          <div className="bg-gray-800 p-5 rounded-xl shadow h-[320px]">
            <h2 className="text-white text-lg mb-3">
              Monthly Profit Heatmap
            </h2>
            <ProfitHeatmap />
          </div>

          <div className="bg-gray-800 p-5 rounded-xl shadow h-[320px]">
            <h2 className="text-white text-lg mb-3">
              Trade Distribution
            </h2>
            <TradeDistribution />
          </div>

        </div>

        {/* STRATEGY ANALYTICS */}
        <div className="bg-gray-800 p-5 rounded-xl shadow mb-6">

          <h2 className="text-white text-lg mb-4">
            Strategy Performance
          </h2>

          <Bar data={strategyChart} />

        </div>

        {/* EQUITY CURVE */}
        <EquityChart />

      </div>

    </div>

  );

}

export default Performance;