import AddTrade from "../components/AddTrade";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import SummaryCards from "../components/SummaryCards";
import { useEffect, useRef, useState } from "react";
import MarketHeatmap from "../components/MarketHeatmap";

function Dashboard() {

  const chartRef = useRef(null);
  const navigate = useNavigate();

  const [chartSymbol, setChartSymbol] = useState("NASDAQ:AAPL");
  const [chartSearch, setChartSearch] = useState("");
  const [chartSuggestions, setChartSuggestions] = useState([]);

  const [balance, setBalance] = useState(10000);
  const [capitalUsed, setCapitalUsed] = useState(0);

  const API_KEY = "d6lj43pr01qrq6i2v060d6lj43pr01qrq6i2v06g";

  // LOGIN CHECK
  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
    }

  }, []);

  // LOAD BALANCE
  useEffect(() => {

    const storedBalance =
      Number(localStorage.getItem("balance")) || 10000;

    localStorage.setItem("balance", storedBalance);

    setBalance(storedBalance);

    calculateCapital();

  }, []);

  // CAPITAL USED
  const calculateCapital = () => {

    const trades =
      JSON.parse(localStorage.getItem("trades")) || [];

    let capital = 0;

    trades.forEach(trade => {

      if (trade.status === "OPEN") {
        capital += trade.entryPrice * trade.quantity;
      }

    });

    setCapitalUsed(capital);

  };

  // TRADINGVIEW CHART
  useEffect(() => {

    const container = chartRef.current;

    if (!container) return;

    container.innerHTML = "";

    const script = document.createElement("script");

    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";

    script.async = true;

    script.innerHTML = JSON.stringify({
      width: "100%",
      height: 500,
      symbol: chartSymbol,
      interval: "D",
      timezone: "Etc/UTC",
      theme: "dark",
      style: "1",
      locale: "en",
      allow_symbol_change: true
    });

    container.appendChild(script);

  }, [chartSymbol]);

  // SYMBOL SEARCH
  const searchChartSymbol = async (value) => {

    setChartSearch(value);

    if (value.length < 1) {
      setChartSuggestions([]);
      return;
    }

    try {

      const res = await fetch(
        `https://finnhub.io/api/v1/search?q=${value}&token=${API_KEY}`
      );

      const data = await res.json();

      setChartSuggestions(data.result.slice(0, 5));

    } catch (err) {

      console.error(err);

    }

  };

  return (

    <div className="flex bg-gray-900 min-h-screen">

      <Sidebar />

      <div className="flex-1 p-6">

        {/* ACCOUNT PANEL */}
        <div className="grid grid-cols-3 gap-4 mb-6">

          <div className="bg-gray-800 p-5 rounded-xl shadow text-white">
            <h3 className="text-gray-400 text-sm">
              Account Balance
            </h3>
            <p className="text-2xl text-green-400 font-bold">
              ₹{balance.toFixed(2)}
            </p>
          </div>

          <div className="bg-gray-800 p-5 rounded-xl shadow text-white">
            <h3 className="text-gray-400 text-sm">
              Capital Used
            </h3>
            <p className="text-2xl font-bold">
              ₹{capitalUsed.toFixed(2)}
            </p>
          </div>

          <div className="bg-gray-800 p-5 rounded-xl shadow text-white">
            <h3 className="text-gray-400 text-sm">
              Available Balance
            </h3>
            <p className="text-2xl text-green-400 font-bold">
              ₹{(balance - capitalUsed).toFixed(2)}
            </p>
          </div>

        </div>

        {/* SUMMARY */}
        <SummaryCards />

        {/* MARKET HEATMAP */}
        <div className="bg-gray-800 p-5 rounded-xl shadow mb-6">
          <h2 className="text-white text-lg mb-3">
            Market Heatmap
          </h2>

          <MarketHeatmap />
        </div>

        {/* CHART SEARCH */}
        <div className="relative mb-4">

          <input
            className="p-2 rounded w-72"
            placeholder="Search Symbol (AAPL, TSLA)"
            value={chartSearch}
            onChange={(e) => searchChartSymbol(e.target.value)}
          />

          {chartSuggestions.length > 0 && (

            <div className="absolute bg-gray-700 text-white mt-1 rounded w-72 shadow-lg z-10">

              {chartSuggestions.map((item) => (

                <div
                  key={item.symbol}
                  className="p-2 hover:bg-gray-600 cursor-pointer"
                  onClick={() => {
                    setChartSymbol(item.symbol);
                    setChartSearch(item.symbol);
                    setChartSuggestions([]);
                  }}
                >
                  {item.symbol} — {item.description}
                </div>

              ))}

            </div>

          )}

        </div>

        {/* MARKET CHART */}
        <div className="bg-gray-800 p-5 rounded-xl shadow mb-6">

          <h2 className="text-white text-lg mb-3">
            Market Chart
          </h2>

          <div ref={chartRef}></div>

        </div>

        {/* ADD TRADE */}
        <AddTrade />

      </div>

    </div>

  );

}

export default Dashboard;