import { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

function EquityChart() {

  const API = "https://tradejournal-backend-uwpp.onrender.com";
  const token = localStorage.getItem("token");

  const [equityData, setEquityData] = useState([100]);
  const [labels, setLabels]         = useState(["Start"]);
  const [metrics, setMetrics]       = useState({
    maxDrawdown: "0.00",
    profitFactor: "0.00",
    avgWin: "0.00",
    avgLoss: "0.00"
  });

  useEffect(() => {

    // FIX 9: Fetch from backend instead of localStorage
    const fetchTrades = async () => {

      try {

        const res = await axios.get(`${API}/api/trades`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const trades = res.data;

        if (trades.length === 0) return;

        let equity = 100;
        const eqData = [equity];

        trades.forEach(trade => {
          equity += trade.profitLoss;
          eqData.push(equity);
        });

        setEquityData(eqData);
        setLabels(["Start", ...trades.map((_, i) => `Trade ${i + 1}`)]);

        const wins   = trades.filter(t => t.profitLoss > 0);
        const losses = trades.filter(t => t.profitLoss < 0);

        const totalProfit = wins.reduce((a, b) => a + b.profitLoss, 0);
        const totalLoss   = Math.abs(losses.reduce((a, b) => a + b.profitLoss, 0));

        const avgWin       = wins.length   ? (totalProfit / wins.length).toFixed(2)   : "0.00";
        const avgLoss      = losses.length ? (totalLoss   / losses.length).toFixed(2) : "0.00";
        const profitFactor = totalLoss     ? (totalProfit / totalLoss).toFixed(2)     : "0.00";

        let peak = eqData[0], maxDrawdown = 0;
        eqData.forEach(v => {
          if (v > peak) peak = v;
          const dd = peak - v;
          if (dd > maxDrawdown) maxDrawdown = dd;
        });

        setMetrics({ maxDrawdown: maxDrawdown.toFixed(2), profitFactor, avgWin, avgLoss });

      } catch (err) {
        console.error("EquityChart fetch error:", err);
      }

    };

    fetchTrades();

  }, []);

  const data = {
    labels,
    datasets: [
      {
        label: "Equity Curve",
        data: equityData,
        tension: 0.35,
        fill: false,
        segment: {
          borderColor: ctx => {
            const { p0, p1 } = ctx;
            return p1.parsed.y >= p0.parsed.y ? "#22c55e" : "#ef4444";
          }
        },
        pointRadius: 4
      }
    ]
  };

  const options = {
    plugins: { legend: { labels: { color: "white" } } },
    scales: {
      x: { ticks: { color: "white" } },
      y: { ticks: { color: "white" } }
    }
  };

  return (

    <div className="bg-gray-800 p-6 rounded-xl">

      <h2 className="text-white text-xl mb-4">Performance</h2>

      <div className="grid grid-cols-4 gap-4 mb-6">

        <div className="bg-gray-700 p-4 rounded">
          <p className="text-gray-300 text-sm">Max Drawdown</p>
          <p className="text-red-400 text-xl font-bold">₹{metrics.maxDrawdown}</p>
        </div>

        <div className="bg-gray-700 p-4 rounded">
          <p className="text-gray-300 text-sm">Profit Factor</p>
          <p className="text-green-400 text-xl font-bold">{metrics.profitFactor}</p>
        </div>

        <div className="bg-gray-700 p-4 rounded">
          <p className="text-gray-300 text-sm">Average Win</p>
          <p className="text-green-400 text-xl font-bold">₹{metrics.avgWin}</p>
        </div>

        <div className="bg-gray-700 p-4 rounded">
          <p className="text-gray-300 text-sm">Average Loss</p>
          <p className="text-red-400 text-xl font-bold">₹{metrics.avgLoss}</p>
        </div>

      </div>

      <Line data={data} options={options} />

    </div>

  );

}

export default EquityChart;