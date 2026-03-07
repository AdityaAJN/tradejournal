import { useState } from "react";
import axios from "axios";

function AddTrade() {

  const API = "https://tradejournal-backend-uwpp.onrender.com";
  const token = localStorage.getItem("token");

  const [symbol, setSymbol] = useState("");
  const [entryPrice, setEntryPrice] = useState("");
  const [exitPrice, setExitPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [stopLoss, setStopLoss] = useState("");
  const [target, setTarget] = useState("");
  const [strategy, setStrategy] = useState("Breakout");
  const [notes, setNotes] = useState("");

  const addTrade = async () => {

    if (!symbol || !entryPrice || !quantity) {
      alert("Symbol, Entry Price and Quantity required");
      return;
    }

    try {

      await axios.post(
        `${API}/api/trades`,
        {
          symbol,
          entryPrice: Number(entryPrice),
          exitPrice: exitPrice ? Number(exitPrice) : null,
          quantity: Number(quantity),
          stopLoss: Number(stopLoss),
          target: Number(target),
          strategy,
          notes
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Trade Added");

      window.location.reload();

    } catch (err) {

      console.error(err);
      alert("Failed to add trade");

    }

  };

  return (

    <div className="bg-gray-800 p-4 rounded-xl mb-6">

      <h2 className="text-white text-xl mb-3">Add Trade</h2>

      <div className="flex flex-wrap gap-2">

        <input
          className="p-2 rounded bg-white text-black"
          placeholder="Symbol"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
        />

        <input
          className="p-2 rounded bg-white text-black"
          placeholder="Entry Price"
          type="number"
          value={entryPrice}
          onChange={(e) => setEntryPrice(e.target.value)}
        />

        <input
          className="p-2 rounded bg-white text-black"
          placeholder="Quantity"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />

        <input
          className="p-2 rounded bg-white text-black"
          placeholder="Exit Price"
          type="number"
          value={exitPrice}
          onChange={(e) => setExitPrice(e.target.value)}
        />

        <input
          className="p-2 rounded bg-white text-black"
          placeholder="Stop Loss"
          type="number"
          value={stopLoss}
          onChange={(e) => setStopLoss(e.target.value)}
        />

        <input
          className="p-2 rounded bg-white text-black"
          placeholder="Target"
          type="number"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
        />

      </div>

      <div className="mt-3">

        <select
          className="p-2 rounded bg-white text-black"
          value={strategy}
          onChange={(e) => setStrategy(e.target.value)}
        >
          <option>Breakout</option>
          <option>Pullback</option>
          <option>Scalp</option>
          <option>Swing</option>
          <option>SMC</option>
        </select>

      </div>

      <textarea
        className="p-2 rounded w-full mt-3 bg-white text-black"
        placeholder="Trade Notes..."
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />

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