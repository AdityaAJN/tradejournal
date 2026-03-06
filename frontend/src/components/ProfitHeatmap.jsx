import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";

function ProfitHeatmap() {

  const trades = JSON.parse(localStorage.getItem("trades")) || [];

  const data = trades.map(trade => ({
    date: new Date(trade.id).toISOString().slice(0,10),
    pnl: trade.pnl
  }));

  return (

    <div className="bg-gray-800 p-6 rounded-xl mt-6">

      <h2 className="text-white text-xl mb-4">
        Monthly Profit Heatmap
      </h2>

      <CalendarHeatmap
        startDate={new Date(new Date().setMonth(new Date().getMonth() - 6))}
        endDate={new Date()}
        values={data}
        classForValue={(value) => {

          if (!value) return "color-empty";

          return value.pnl >= 0
            ? "color-profit"
            : "color-loss";

        }}
      />

    </div>

  );
}

export default ProfitHeatmap;