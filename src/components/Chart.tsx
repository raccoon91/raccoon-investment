import { FC, useEffect, useRef } from "react";
import { Box } from "@mui/material";
import { IChartApi, createChart } from "lightweight-charts";

interface IChartProps {
  chartValues?: ICandleChartData[] | null;
}

export const Chart: FC<IChartProps> = ({ chartValues }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<IChartApi | null>(null);

  useEffect(() => {
    if (!chartRef.current || !chartValues) return;

    chartInstance.current = createChart(chartRef.current, {
      layout: {
        background: { color: "#121212" },
        textColor: "#DDD",
      },
      grid: {
        vertLines: { color: "#222" },
        horzLines: { color: "#222" },
      },
    });

    const candlestickSeries = chartInstance.current.addCandlestickSeries({
      upColor: "#f44336",
      downColor: "#2196f3",
      borderVisible: false,
      wickUpColor: "#f44336",
      wickDownColor: "#2196f3",
    });

    candlestickSeries.setData(chartValues);

    chartInstance.current.timeScale().fitContent();

    return () => {
      chartInstance.current?.remove();
    };
  }, [chartRef, chartInstance, chartValues]);

  return <Box ref={chartRef} sx={{ width: "100%", height: "100%" }} />;
};
