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

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
);

function EquityChart() {

  const trades = JSON.parse(localStorage.getItem("trades")) || [];

  let equity = 100;

  const equityData = [equity];

  trades.forEach(trade => {
    equity += trade.pnl;
    equityData.push(equity);
  });

  const labels = ["Start", ...trades.map((_, i) => `Trade ${i + 1}`)];

  // ----- METRICS -----

  const wins = trades.filter(t => t.pnl > 0);
  const losses = trades.filter(t => t.pnl < 0);

  const totalProfit = wins.reduce((a,b)=>a+b.pnl,0);
  const totalLoss = Math.abs(losses.reduce((a,b)=>a+b.pnl,0));

  const avgWin = wins.length ? (totalProfit / wins.length).toFixed(2) : "0.00";
const avgLoss = losses.length ? (totalLoss / losses.length).toFixed(2) : "0.00";
const profitFactor = totalLoss ? (totalProfit / totalLoss).toFixed(2) : "0.00";
  // Max Drawdown
  let peak = equityData[0];
  let maxDrawdown = 0;

  equityData.forEach(value => {

    if(value > peak) peak = value;

    const drawdown = peak - value;

    if(drawdown > maxDrawdown)
      maxDrawdown = drawdown;

  });
  maxDrawdown = maxDrawdown.toFixed(2);

  // ----- CHART DATA -----

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
            return p1.parsed.y >= p0.parsed.y
              ? "#22c55e"
              : "#ef4444";
          }
        },
        pointRadius: 4
      }
    ]
  };

  const options = {
    plugins: {
      legend: {
        labels: { color: "white" }
      }
    },
    scales: {
      x: { ticks: { color: "white" } },
      y: { ticks: { color: "white" } }
    }
  };

  return (

    <div className="bg-gray-800 p-6 rounded-xl">

      <h2 className="text-white text-xl mb-4">Performance</h2>

      {/* Metrics */}

      <div className="grid grid-cols-4 gap-4 mb-6">

        <div className="bg-gray-700 p-4 rounded">
          <p className="text-gray-300 text-sm">Max Drawdown</p>
          <p className="text-red-400 text-xl font-bold">₹{maxDrawdown}</p>
        </div>

        <div className="bg-gray-700 p-4 rounded">
          <p className="text-gray-300 text-sm">Profit Factor</p>
          <p className="text-green-400 text-xl font-bold">{profitFactor}</p>
        </div>

        <div className="bg-gray-700 p-4 rounded">
          <p className="text-gray-300 text-sm">Average Win</p>
          <p className="text-green-400 text-xl font-bold">₹{avgWin}</p>
        </div>

        <div className="bg-gray-700 p-4 rounded">
          <p className="text-gray-300 text-sm">Average Loss</p>
          <p className="text-red-400 text-xl font-bold">₹{avgLoss}</p>
        </div>

      </div>

      <Line data={data} options={options} />

    </div>

  );

}

export default EquityChart;