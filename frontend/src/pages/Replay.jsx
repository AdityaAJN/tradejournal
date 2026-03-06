import Sidebar from "../components/Sidebar";
import ReplayChart from "../components/ReplayChart";
import { useState, useEffect } from "react";

function Replay() {

const API_KEY = "d6lj43pr01qrq6i2v060d6lj43pr01qrq6i2v06g";

  const [symbol, setSymbol] = useState("AAPL");
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const [candles, setCandles] = useState([]);
  const [step, setStep] = useState(50);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1000);

  // SEARCH SYMBOL
  const searchSymbol = async (value) => {

    setSearch(value);

    if (value.length < 1) {
      setSuggestions([]);
      return;
    }

    const res = await fetch(
      `https://finnhub.io/api/v1/search?q=${value}&token=${API_KEY}`
    );

    const data = await res.json();

    setSuggestions(data.result.slice(0,5));

  };

  // LOAD HISTORICAL CANDLES
  const loadCandles = async (selectedSymbol = symbol) => {

  const API_KEY = "5H1I28CCL3FEG1OJ"; // replace with your AlphaVantage key

  try {

    const res = await fetch(
      `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${selectedSymbol}&apikey=${API_KEY}`
    );

    const data = await res.json();

    const series = data["Time Series (Daily)"];

    if (!series) {
      alert("No data found for this symbol");
      return;
    }

    const formatted = Object.keys(series)
      .map(date => ({
        time: Math.floor(new Date(date).getTime() / 1000),
        open: Number(series[date]["1. open"]),
        high: Number(series[date]["2. high"]),
        low: Number(series[date]["3. low"]),
        close: Number(series[date]["4. close"])
      }))
      .reverse();

    setCandles(formatted);
    setStep(50);

  } catch (err) {

    console.error("Candle load error", err);

  }

};
useEffect(() => {
  loadCandles(symbol);
}, []);
  // AUTO REPLAY
  useEffect(() => {

    if (!playing) return;

    const interval = setInterval(() => {

      setStep(prev => {

        if (prev >= candles.length) {
          setPlaying(false);
          return prev;
        }

        return prev + 1;

      });

    }, speed);

    return () => clearInterval(interval);

  }, [playing, speed, candles]);

  useEffect(() => {
    loadCandles(symbol);
  }, []);

  return (

    <div className="flex bg-gray-900 min-h-screen">

      <Sidebar />

      <div className="flex-1 p-6">

        <h1 className="text-white text-2xl mb-6">
          Trading Replay
        </h1>

        {/* SYMBOL SEARCH */}
        <div className="relative mb-4">

          <input
            className="p-2 rounded w-72"
            placeholder="Search Symbol (AAPL)"
            value={search}
            onChange={(e) => searchSymbol(e.target.value)}
          />

          {suggestions.length > 0 && (

            <div className="absolute bg-gray-700 text-white rounded mt-1 w-72">

              {suggestions.map(item => (

                <div
                  key={item.symbol}
                  className="p-2 hover:bg-gray-600 cursor-pointer"
                  onClick={()=>{
                    setSymbol(item.symbol);
                    setSearch(item.symbol);
                    setSuggestions([]);
                    loadCandles(item.symbol);
                  }}
                >
                  {item.symbol} — {item.description}
                </div>

              ))}

            </div>

          )}

        </div>

        {/* CONTROLS */}
        <div className="flex gap-3 mb-6">

          <button
            onClick={()=>setPlaying(!playing)}
            className="bg-green-600 px-4 py-2 rounded"
          >
            {playing ? "Pause" : "Play"}
          </button>

          <button
            onClick={()=>setStep(step+1)}
            className="bg-blue-600 px-4 py-2 rounded"
          >
            Next Candle
          </button>

          <button
            onClick={()=>setStep(50)}
            className="bg-red-600 px-4 py-2 rounded"
          >
            Reset
          </button>

          <select
            className="bg-gray-800 text-white p-2 rounded"
            onChange={(e)=>setSpeed(Number(e.target.value))}
          >
            <option value="1000">1x</option>
            <option value="500">2x</option>
            <option value="200">5x</option>
          </select>

        </div>

        {/* CHART */}
        <ReplayChart candles={candles} step={step} />

      </div>

    </div>

  );

}

export default Replay;