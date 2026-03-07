import Sidebar from "../components/Sidebar";
import ReplayChart from "../components/ReplayChart";
import { useState, useEffect } from "react";

function Replay() {

  const FINNHUB_KEY = "d6lj43pr01qrq6i2v060d6lj43pr01qrq6i2v06g";
  const TWELVEDATA_KEY = "9e3caf5f2bdf48aca65ff8fc0216e894";

  const [symbol, setSymbol] = useState("AAPL");
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const [candles, setCandles] = useState([]);
  const [step, setStep] = useState(50);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1000);
  const [loading, setLoading] = useState(false);

  // SEARCH SYMBOL
  const searchSymbol = async (value) => {

    setSearch(value);

    if (value.length < 1) {
      setSuggestions([]);
      return;
    }

    try {

      const res = await fetch(
        `https://finnhub.io/api/v1/search?q=${value}&token=${FINNHUB_KEY}`
      );

      const data = await res.json();

      setSuggestions(data.result.slice(0, 5));

    } catch (err) {

      console.error("Search error:", err);

    }

  };

  // LOAD HISTORICAL CANDLES
  const loadCandles = async (selectedSymbol = symbol) => {

    setLoading(true);

    const cacheKey = "replay_" + selectedSymbol;
    const cached = localStorage.getItem(cacheKey);

    // USE CACHE FIRST
    if (cached) {

      const parsed = JSON.parse(cached);
      setCandles(parsed);
      setStep(Math.min(50, parsed.length));
      setLoading(false);
      return;

    }

    try {

      const res = await fetch(
        `https://api.twelvedata.com/time_series?symbol=${selectedSymbol}&interval=1day&outputsize=500&apikey=${TWELVEDATA_KEY}`
      );

      const data = await res.json();

      if (!data.values) {

        console.log("API limit reached, using demo candles");

        // DEMO CANDLES (fallback)
        const demo = Array.from({ length: 200 }).map((_, i) => ({
          time: 1700000000 + i * 86400,
          open: 100 + Math.random() * 10,
          high: 110 + Math.random() * 10,
          low: 90 + Math.random() * 10,
          close: 100 + Math.random() * 10
        }));

        setCandles(demo);
        setStep(50);
        setLoading(false);
        return;

      }

      const formatted = data.values
        .map(c => ({
          time: Math.floor(new Date(c.datetime).getTime() / 1000),
          open: Number(c.open),
          high: Number(c.high),
          low: Number(c.low),
          close: Number(c.close)
        }))
        .reverse();

      localStorage.setItem(cacheKey, JSON.stringify(formatted));

      setCandles(formatted);
      setStep(Math.min(50, formatted.length));

    } catch (err) {

      console.error("Candle load error:", err);

    }

    setLoading(false);

  };

  // LOAD DATA WHEN SYMBOL CHANGES
  useEffect(() => {

    loadCandles(symbol);

  }, [symbol]);

  // AUTO REPLAY
  useEffect(() => {

    if (!playing || candles.length === 0) return;

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

            <div className="absolute bg-gray-700 text-white rounded mt-1 w-72 shadow-lg">

              {suggestions.map(item => (

                <div
                  key={item.symbol}
                  className="p-2 hover:bg-gray-600 cursor-pointer"
                  onClick={() => {

                    setSymbol(item.symbol);
                    setSearch(item.symbol);
                    setSuggestions([]);

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
            onClick={() => setPlaying(!playing)}
            className="bg-green-600 px-4 py-2 rounded"
          >
            {playing ? "Pause" : "Play"}
          </button>

          <button
            onClick={() => setStep(prev => Math.min(prev + 1, candles.length))}
            className="bg-blue-600 px-4 py-2 rounded"
          >
            Next Candle
          </button>

          <button
            onClick={() => setStep(Math.min(50, candles.length))}
            className="bg-red-600 px-4 py-2 rounded"
          >
            Reset
          </button>

          <select
            className="bg-gray-800 text-white p-2 rounded"
            onChange={(e) => setSpeed(Number(e.target.value))}
          >
            <option value="1000">1x</option>
            <option value="500">2x</option>
            <option value="200">5x</option>
          </select>

        </div>

        {/* CHART */}
        {loading && (
          <p className="text-gray-400">Loading candles...</p>
        )}

        {!loading && candles.length > 0 && (
          <ReplayChart candles={candles} step={step} />
        )}

      </div>

    </div>

  );

}

export default Replay;