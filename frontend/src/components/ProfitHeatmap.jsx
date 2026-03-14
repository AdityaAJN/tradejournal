import { useEffect, useState } from "react";
import axios from "axios";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";

function ProfitHeatmap() {

  const API = "https://tradejournal-backend-uwpp.onrender.com";
  const token = localStorage.getItem("token");

  const [heatmapData, setHeatmapData] = useState([]);

  useEffect(() => {

    // FIX 9: Fetch trades from backend instead of localStorage
    const fetchTrades = async () => {

      try {

        const res = await axios.get(`${API}/api/trades`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        // FIX 10: Use trade.tradeDate (actual date field) instead of trade.id
        const data = res.data.map(trade => ({
          date: trade.tradeDate,
          pnl: trade.profitLoss
        }));

        setHeatmapData(data);

      } catch (err) {
        console.error("ProfitHeatmap fetch error:", err);
      }

    };

    fetchTrades();

  }, []);

  return (

    <div className="bg-gray-800 p-6 rounded-xl mt-6">

      <h2 className="text-white text-xl mb-4">
        Monthly Profit Heatmap
      </h2>

      <CalendarHeatmap
        startDate={new Date(new Date().setMonth(new Date().getMonth() - 6))}
        endDate={new Date()}
        values={heatmapData}
        classForValue={(value) => {
          if (!value) return "color-empty";
          return value.pnl >= 0 ? "color-profit" : "color-loss";
        }}
      />

    </div>

  );

}

export default ProfitHeatmap;