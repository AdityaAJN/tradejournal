import { useEffect, useRef } from "react";
import {
  createChart,
  CandlestickSeries
} from "lightweight-charts";

function ReplayChart({ candles, step }) {

  const chartContainer = useRef(null);
  const chartRef = useRef(null);
  const seriesRef = useRef(null);

  // CREATE CHART ONCE
  useEffect(() => {

    const chart = createChart(chartContainer.current, {
      width: chartContainer.current.clientWidth,
      height: 450,
      layout: {
        background: { color: "#1f2937" },
        textColor: "#DDD"
      },
      grid: {
        vertLines: { color: "#2b2b2b" },
        horzLines: { color: "#2b2b2b" }
      },
      crosshair: {
        mode: 1
      }
    });

    const candleSeries = chart.addSeries(CandlestickSeries);

    chartRef.current = chart;
    seriesRef.current = candleSeries;

    // resize chart
    const handleResize = () => {
      chart.applyOptions({
        width: chartContainer.current.clientWidth
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };

  }, []);

  // UPDATE REPLAY CANDLES
  useEffect(() => {

    if (!seriesRef.current) return;

    const visibleCandles = candles.slice(0, step);

    if (candles.length > 0) {
  seriesRef.current.setData(candles.slice(0, step));
}

    if (chartRef.current) {
      chartRef.current.timeScale().fitContent();
    }

  }, [candles, step]);

  return (
    <div
      ref={chartContainer}
      style={{ width: "100%", height: "450px" }}
    />
  );

}

export default ReplayChart;