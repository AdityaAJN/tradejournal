import { useEffect, useRef } from "react";
import { createChart, CandlestickSeries } from "lightweight-charts";

function ReplayChart({ candles, step }) {

  const chartContainer = useRef(null);
  const chartRef = useRef(null);
  const seriesRef = useRef(null);

  // CREATE CHART
  useEffect(() => {

    if (!chartContainer.current) return;

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
      }
    });

    const candleSeries = chart.addSeries(CandlestickSeries);

    chartRef.current = chart;
    seriesRef.current = candleSeries;

    const handleResize = () => {

      if (!chartContainer.current) return;

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

  // UPDATE DATA
  useEffect(() => {

    if (!seriesRef.current) return;
    if (!candles || candles.length === 0) return;

    const visibleCandles = candles.slice(0, step);

    seriesRef.current.setData(visibleCandles);

    if (chartRef.current) {
      chartRef.current.timeScale().fitContent();
    }

  }, [candles, step]);

  return (
    <div
      ref={chartContainer}
      style={{
        width: "100%",
        height: "450px"
      }}
    />
  );

}

export default ReplayChart;