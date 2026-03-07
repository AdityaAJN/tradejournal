import { useState } from "react";
import axios from "axios";

function AddTrade() {

  const API = "https://tradejournal-backend-uwpp.onrender.com";

  const [symbol, setSymbol] = useState("");
  const [entryPrice, setEntryPrice] = useState("");
  const [exitPrice, setExitPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [notes, setNotes] = useState("");

  const addTrade = async () => {

    if (!symbol || !entryPrice || !quantity) {
      alert("Symbol, Entry Price and Quantity required");
      return;
    }

    try {

      await axios.post(`${API}/api/trades`, {

        symbol: symbol,
        entryPrice: Number(entryPrice),
        exitPrice: exitPrice ? Number(exitPrice) : null,
        quantity: Number(quantity),
        notes: notes

      });

      alert("Trade added successfully");

      window.location.reload();

    } catch (err) {

      console.error(err);
      alert("Failed to add trade");

    }

  };

  return (

    <div className="space-y-3">

      <input
        className="bg-gray-900 border border-gray-700 p-2 rounded w-full"
        placeholder="Symbol"
        value={symbol}
        onChange={(e)=>setSymbol(e.target.value)}
      />

      <input
        className="bg-gray-900 border border-gray-700 p-2 rounded w-full"
        placeholder="Entry Price"
        type="number"
        value={entryPrice}
        onChange={(e)=>setEntryPrice(e.target.value)}
      />

      <input
        className="bg-gray-900 border border-gray-700 p-2 rounded w-full"
        placeholder="Exit Price (optional)"
        type="number"
        value={exitPrice}
        onChange={(e)=>setExitPrice(e.target.value)}
      />

      <input
        className="bg-gray-900 border border-gray-700 p-2 rounded w-full"
        placeholder="Quantity"
        type="number"
        value={quantity}
        onChange={(e)=>setQuantity(e.target.value)}
      />

      <textarea
        className="bg-gray-900 border border-gray-700 p-2 rounded w-full"
        placeholder="Notes"
        value={notes}
        onChange={(e)=>setNotes(e.target.value)}
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