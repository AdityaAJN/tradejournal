import { useEffect, useState } from "react";
import axios from "axios";

function MarketHeatmap() {

  const [stocks, setStocks] = useState([]);

  const API_KEY = "d6lj43pr01qrq6i2v060d6lj43pr01qrq6i2v06g";

  const symbols = [
    "AAPL","MSFT","NVDA","AMZN",
    "META","TSLA","GOOGL","JPM",
    "BAC","GS","XOM","JNJ"
  ];

  useEffect(() => {

    const fetchData = async () => {

      const results = await Promise.all(
        symbols.map(async (symbol) => {

          const res = await axios.get(
            `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`
          );

          return {
            symbol,
            change: res.data.dp
          };

        })
      );

      setStocks(results);

    };

    fetchData();

  }, []);
const getColor = (change) => {

  if (change > 3) return "bg-green-700";
  if (change > 1) return "bg-green-500";
  if (change > 0) return "bg-green-300";

  if (change < -3) return "bg-red-700";
  if (change < -1) return "bg-red-500";

  return "bg-red-300";

};
  return (

   <div className="grid grid-cols-6 gap-3">

      {stocks.map((stock) => (

        <div
          key={stock.symbol}
          className={`p-5 rounded-xl text-center font-semibold text-white
          ${getColor(stock.change)}`}
        >
          {stock.symbol}
          <div className="text-sm">
            {stock.change?.toFixed(2)}%
          </div>
        </div>

      ))}

    </div>

  );

}

export default MarketHeatmap;