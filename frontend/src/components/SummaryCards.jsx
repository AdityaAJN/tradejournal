import { useEffect, useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  Percent,
  Activity,
  BarChart3,
  Trophy,
  AlertTriangle
} from "lucide-react";

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

  const card =
    "bg-gray-900 border border-gray-800 p-5 rounded-xl shadow hover:shadow-lg transition";

  const label =
    "text-gray-400 text-sm mb-1 flex items-center gap-2";

  const value =
    "text-2xl font-bold";

  return (

    <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-8">

      <div className={card}>
        <div className={label}>
          <Activity size={16}/> Total Trades
        </div>
        <p className={`${value} text-white`}>
          {summary.totalTrades}
        </p>
      </div>

      <div className={card}>
        <div className={label}>
          <TrendingUp size={16}/> Net PnL
        </div>
        <p className={`${value} ${
          summary.netPnL >= 0
            ? "text-green-400"
            : "text-red-400"
        }`}>
          ₹{summary.netPnL}
        </p>
      </div>

      <div className={card}>
        <div className={label}>
          <Percent size={16}/> Win Rate
        </div>
        <p className={`${value} text-white`}>
          {summary.winRate}%
        </p>
      </div>

      <div className={card}>
        <div className={label}>
          <BarChart3 size={16}/> Avg Trade
        </div>
        <p className={`${value} text-white`}>
          ₹{summary.avgTrade}
        </p>
      </div>

      <div className={card}>
        <div className={label}>
          <TrendingUp size={16}/> Profit Factor
        </div>
        <p className={`${value} text-blue-400`}>
          {summary.profitFactor}
        </p>
      </div>

      <div className={card}>
        <div className={label}>
          <Trophy size={16}/> Best Trade
        </div>
        <p className={`${value} text-green-400`}>
          ₹{summary.bestTrade}
        </p>
      </div>

      <div className={card}>
        <div className={label}>
          <TrendingDown size={16}/> Worst Trade
        </div>
        <p className={`${value} text-red-400`}>
          ₹{summary.worstTrade}
        </p>
      </div>

      <div className={card}>
        <div className={label}>
          <AlertTriangle size={16}/> Max Drawdown
        </div>
        <p className={`${value} text-red-400`}>
          ₹{summary.maxDrawdown}
        </p>
      </div>

    </div>

  );

}

export default SummaryCards;