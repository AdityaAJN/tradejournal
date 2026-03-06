import { useState } from "react";
import axios from "axios";

function AddTrade() {

  const [symbol, setSymbol] = useState("");
  const [searchText, setSearchText] = useState("");
  const [entryPrice, setEntryPrice] = useState("");
  const [exitPrice, setExitPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [stopLoss, setStopLoss] = useState("");
  const [target, setTarget] = useState("");
  const [strategy, setStrategy] = useState("Breakout");
  const [notes, setNotes] = useState("");
  const [screenshot, setScreenshot] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  const [accountSize, setAccountSize] = useState("");
  const [riskPercent, setRiskPercent] = useState("");

  const API_KEY = "d6lj43pr01qrq6i2v060d6lj43pr01qrq6i2v06g";

  // SEARCH SYMBOL
  const searchSymbol = async (value) => {

    setSearchText(value);

    if (value.length < 1) {
      setSuggestions([]);
      return;
    }

    try {

      const res = await axios.get(
        `https://finnhub.io/api/v1/search?q=${value}&token=${API_KEY}`
      );

      setSuggestions(res.data.result.slice(0, 5));

    } catch (err) {
      console.error(err);
    }

  };

  // FETCH LIVE PRICE
  const fetchPrice = async (selectedSymbol = symbol) => {

    try {

      const res = await axios.get(
        `https://finnhub.io/api/v1/quote?symbol=${selectedSymbol}&token=${API_KEY}`
      );

      setEntryPrice(res.data.c);

    } catch (err) {
      console.error("Price fetch error", err);
    }

  };

  // SCREENSHOT
  const handleScreenshot = (e) => {

    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setScreenshot(reader.result);
    };

    if (file) reader.readAsDataURL(file);

  };

  // POSITION SIZE CALCULATOR
  const riskAmount =
    accountSize && riskPercent
      ? (accountSize * riskPercent) / 100
      : 0;

  const positionSize =
    stopLoss && entryPrice
      ? (riskAmount / (entryPrice - stopLoss)).toFixed(2)
      : 0;

  // ADD TRADE
  const addTrade = () => {

    if (!symbol || !entryPrice || !quantity) {
      alert("Symbol, Entry Price and Quantity required");
      return;
    }

    let pnl = 0;
    let closed = false;

    if (exitPrice) {
      pnl = (exitPrice - entryPrice) * quantity;
      closed = true;
    }

    const risk = entryPrice - stopLoss;
    const reward = target - entryPrice;
    const rr = risk > 0 ? (reward / risk).toFixed(2) : 0;

    let balance = Number(localStorage.getItem("balance")) || 10000;

    // balance changes only if trade closed
    if (closed) {
      balance += pnl;
      localStorage.setItem("balance", balance);
    }

    const capitalUsed = entryPrice * quantity;

    const newTrade = {
      id: Date.now(),
      symbol,
      entryPrice: Number(entryPrice),
      exitPrice: exitPrice ? Number(exitPrice) : null,
      quantity: Number(quantity),
      stopLoss: Number(stopLoss),
      target: Number(target),
      pnl,
      rr,
      strategy,
      notes,
      screenshot,
      capitalUsed,
      status: closed ? "CLOSED" : "OPEN",
      timestamp: new Date().toISOString()
    };

    const trades = JSON.parse(localStorage.getItem("trades")) || [];

    trades.push(newTrade);

    localStorage.setItem("trades", JSON.stringify(trades));

    window.location.reload();

  };

  return (

    <div className="bg-gray-800 p-4 rounded-xl mb-6">

      <h2 className="text-white text-xl mb-3">Add Trade</h2>

      {/* SYMBOL SEARCH */}
      <div className="relative mb-3">

        <input
          className="p-2 mr-2 rounded"
          placeholder="Search Symbol (AAPL)"
          value={searchText}
          onChange={(e) => searchSymbol(e.target.value)}
        />

        {suggestions.length > 0 && (

          <div className="absolute bg-gray-700 text-white mt-1 rounded w-64 z-10">

            {suggestions.map((item) => (

              <div
                key={item.symbol}
                className="p-2 hover:bg-gray-600 cursor-pointer"
                onClick={() => {
                  setSymbol(item.symbol);
                  setSearchText(item.symbol);
                  setSuggestions([]);
                  fetchPrice(item.symbol);
                }}
              >
                {item.symbol} — {item.description}
              </div>

            ))}

          </div>

        )}

      </div>

      <button
        className="bg-blue-500 px-3 py-2 rounded mr-2 mb-3"
        onClick={fetchPrice}
      >
        Fetch Price
      </button>

      {/* TRADE INPUTS */}
      <div className="flex flex-wrap gap-2">

        <input
          className="p-2 rounded"
          placeholder="Entry Price"
          type="number"
          value={entryPrice}
          onChange={(e) => setEntryPrice(e.target.value)}
        />

        <input
          className="p-2 rounded"
          placeholder="Quantity"
          type="number"
          onChange={(e) => setQuantity(e.target.value)}
        />

        <input
          className="p-2 rounded"
          placeholder="Exit Price (optional)"
          type="number"
          onChange={(e) => setExitPrice(e.target.value)}
        />

        <input
          className="p-2 rounded"
          placeholder="Stop Loss"
          type="number"
          onChange={(e) => setStopLoss(e.target.value)}
        />

        <input
          className="p-2 rounded"
          placeholder="Target"
          type="number"
          onChange={(e) => setTarget(e.target.value)}
        />

      </div>

      {/* POSITION CALCULATOR */}
      <div className="bg-gray-700 p-3 rounded mt-4">

        <h3 className="text-white mb-2">
          Position Size Calculator
        </h3>

        <div className="flex gap-2 flex-wrap">

          <input
            className="p-2 rounded"
            placeholder="Account Size"
            type="number"
            onChange={(e) => setAccountSize(e.target.value)}
          />

          <input
            className="p-2 rounded"
            placeholder="Risk %"
            type="number"
            onChange={(e) => setRiskPercent(e.target.value)}
          />

        </div>

        <p className="text-white mt-2">
          Risk Amount: ₹{riskAmount.toFixed(2)}
        </p>

        <p className="text-green-400">
          Position Size: {positionSize} shares
        </p>

      </div>

      {/* STRATEGY */}
      <div className="mt-3">

        <select
          className="p-2 rounded"
          onChange={(e) => setStrategy(e.target.value)}
        >
          <option>Breakout</option>
          <option>Pullback</option>
          <option>Scalp</option>
          <option>Swing</option>
          <option>SMC</option>
        </select>

      </div>

      {/* NOTES */}
      <textarea
        className="p-2 rounded w-full mt-3"
        placeholder="Trade Notes..."
        onChange={(e) => setNotes(e.target.value)}
      />

      {/* SCREENSHOT */}
      <div className="mt-3 text-white">

        <label>Upload Screenshot</label>

        <input
          type="file"
          onChange={handleScreenshot}
        />

      </div>

      <button
        className="bg-green-500 px-4 py-2 rounded mt-4"
        onClick={addTrade}
      >
        Add Trade
      </button>

    </div>

  );

}

export default AddTrade;