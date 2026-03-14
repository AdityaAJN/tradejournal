import { useState } from "react";
import axios from "axios";

function AddTrade() {

  const API = "https://tradejournal-backend-uwpp.onrender.com";
  const token = localStorage.getItem("token");

  const [symbol, setSymbol] = useState("");
  // FIX 7: Added tradeType state
  const [tradeType, setTradeType] = useState("BUY");
  const [entryPrice, setEntryPrice] = useState("");
  const [exitPrice, setExitPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  // FIX 7: Added tradeDate state
  const [tradeDate, setTradeDate] = useState("");
  const [notes, setNotes] = useState("");

  const addTrade = async () => {

    if (!symbol || !entryPrice || !quantity || !tradeDate) {
      alert("Symbol, Entry Price, Quantity and Date are required");
      return;
    }

    try {

      const res = await axios.post(
        `${API}/api/trades`,
        {
          symbol: symbol,
          // FIX 7: Send tradeType and tradeDate to backend
          tradeType: tradeType,
          tradeDate: tradeDate,
          entryPrice: Number(entryPrice),
          exitPrice: exitPrice ? Number(exitPrice) : null,
          quantity: Number(quantity),
          notes: notes
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      console.log(res.data);
      alert("Trade Added Successfully");

      setSymbol("");
      setTradeType("BUY");
      setEntryPrice("");
      setExitPrice("");
      setQuantity("");
      setTradeDate("");
      setNotes("");

    } catch (err) {
      console.error(err);
      alert("Failed to add trade");
    }

  };

  return (

    <div className="space-y-3">

      <input
        className="bg-white text-black p-2 rounded w-full"
        placeholder="Symbol (e.g. AAPL)"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
      />

      {/* FIX 7: TradeType dropdown */}
      <select
        className="bg-white text-black p-2 rounded w-full"
        value={tradeType}
        onChange={(e) => setTradeType(e.target.value)}
      >
        <option value="BUY">BUY</option>
        <option value="SELL">SELL</option>
      </select>

      {/* FIX 7: Trade date input */}
      <input
        className="bg-white text-black p-2 rounded w-full"
        type="date"
        value={tradeDate}
        onChange={(e) => setTradeDate(e.target.value)}
      />

      <input
        className="bg-white text-black p-2 rounded w-full"
        placeholder="Entry Price"
        type="number"
        value={entryPrice}
        onChange={(e) => setEntryPrice(e.target.value)}
      />

      <input
        className="bg-white text-black p-2 rounded w-full"
        placeholder="Exit Price (optional)"
        type="number"
        value={exitPrice}
        onChange={(e) => setExitPrice(e.target.value)}
      />

      <input
        className="bg-white text-black p-2 rounded w-full"
        placeholder="Quantity"
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />

      <textarea
        className="bg-white text-black p-2 rounded w-full"
        placeholder="Notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />

      <button
        onClick={addTrade}
        className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded w-full"
      >
        Add Trade
      </button>

    </div>

  );

}

export default AddTrade;