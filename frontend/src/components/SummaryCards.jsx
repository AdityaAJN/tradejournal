import { useEffect, useState } from "react";

function SummaryCards() {

  const [summary, setSummary] = useState({
    totalTrades: 0,
    netPnL: 0,
    winRate: 0,
    avgTrade: 0,
    profitFactor: 0,
    bestTrade: 0,
    worstTrade: 0,
    maxDrawdown: 0
  });

  useEffect(() => {

    const trades =
      JSON.parse(localStorage.getItem("trades")) || [];

    if (trades.length === 0) return;

    const totalTrades = trades.length;

    const profits = trades.filter(t => t.pnl > 0);
    const losses = trades.filter(t => t.pnl < 0);

    const totalProfit = profits.reduce((a, b) => a + b.pnl, 0);
    const totalLoss = losses.reduce((a, b) => a + b.pnl, 0);

    const netPnL = totalProfit + totalLoss;

    const wins = profits.length;

    const winRate = (wins / totalTrades) * 100;

    const avgTrade = netPnL / totalTrades;

    const profitFactor =
      Math.abs(totalLoss) > 0
        ? (totalProfit / Math.abs(totalLoss))
        : totalProfit;

    const bestTrade =
      Math.max(...trades.map(t => t.pnl));

    const worstTrade =
      Math.min(...trades.map(t => t.pnl));

    // MAX DRAWDOWN CALCULATION
    let equity = 0;
    let peak = 0;
    let maxDrawdown = 0;

    trades.forEach(trade => {

      equity += trade.pnl;

      if (equity > peak) peak = equity;

      const drawdown = peak - equity;

      if (drawdown > maxDrawdown) {
        maxDrawdown = drawdown;
      }

    });

    setSummary({
      totalTrades,
      netPnL: netPnL.toFixed(2),
      winRate: winRate.toFixed(1),
      avgTrade: avgTrade.toFixed(2),
      profitFactor: profitFactor.toFixed(2),
      bestTrade: bestTrade.toFixed(2),
      worstTrade: worstTrade.toFixed(2),
      maxDrawdown: maxDrawdown.toFixed(2)
    });

  }, []);

  return (

    <div className="grid grid-cols-4 gap-4 mb-6">

      {/* Total Trades */}
      <div className="bg-gray-800 p-5 rounded-xl shadow">
        <h3 className="text-gray-400 text-sm">Total Trades</h3>
        <p className="text-2xl font-bold text-white">
          {summary.totalTrades}
        </p>
      </div>

      {/* Net PnL */}
      <div className="bg-gray-800 p-5 rounded-xl shadow">
        <h3 className="text-gray-400 text-sm">Net PnL</h3>
        <p className={`text-2xl font-bold ${
          summary.netPnL >= 0 ? "text-green-400" : "text-red-400"
        }`}>
          ₹{summary.netPnL}
        </p>
      </div>

      {/* Win Rate */}
      <div className="bg-gray-800 p-5 rounded-xl shadow">
        <h3 className="text-gray-400 text-sm">Win Rate</h3>
        <p className="text-2xl font-bold text-white">
          {summary.winRate}%
        </p>
      </div>

      {/* Avg Trade */}
      <div className="bg-gray-800 p-5 rounded-xl shadow">
        <h3 className="text-gray-400 text-sm">Avg Trade</h3>
        <p className="text-2xl font-bold text-white">
          ₹{summary.avgTrade}
        </p>
      </div>

      {/* Profit Factor */}
      <div className="bg-gray-800 p-5 rounded-xl shadow">
        <h3 className="text-gray-400 text-sm">Profit Factor</h3>
        <p className="text-2xl font-bold text-white">
          {summary.profitFactor}
        </p>
      </div>

      {/* Best Trade */}
      <div className="bg-gray-800 p-5 rounded-xl shadow">
        <h3 className="text-gray-400 text-sm">Best Trade</h3>
        <p className="text-2xl font-bold text-green-400">
          ₹{summary.bestTrade}
        </p>
      </div>

      {/* Worst Trade */}
      <div className="bg-gray-800 p-5 rounded-xl shadow">
        <h3 className="text-gray-400 text-sm">Worst Trade</h3>
        <p className="text-2xl font-bold text-red-400">
          ₹{summary.worstTrade}
        </p>
      </div>

      {/* Max Drawdown */}
      <div className="bg-gray-800 p-5 rounded-xl shadow">
        <h3 className="text-gray-400 text-sm">Max Drawdown</h3>
        <p className="text-2xl font-bold text-red-400">
          ₹{summary.maxDrawdown}
        </p>
      </div>

    </div>

  );
}

export default SummaryCards;