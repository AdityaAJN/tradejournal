import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function TradeDistribution() {

  const trades = JSON.parse(localStorage.getItem("trades")) || [];

  const wins = trades.filter(t => t.pnl > 0).length;
  const losses = trades.filter(t => t.pnl < 0).length;

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

  const options = {
    plugins: {
      legend: {
        labels: {
          color: "white"
        }
      }
    }
  };

  return (

    <div className="bg-gray-800 p-6 rounded-xl mt-6">
       <div className="w-full h-[230px]">
  <Pie data={data} options={{ maintainAspectRatio: false }} />
</div>

      <h2 className="text-white text-xl mb-4">
        Trade Distribution
      </h2>

     

    </div>
    

  );

}

export default TradeDistribution;