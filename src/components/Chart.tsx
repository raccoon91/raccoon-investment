import { FC, useEffect, useRef } from "react";
import { Box } from "@mui/material";
import { IChartApi, MouseEventParams, createChart } from "lightweight-charts";
import { useGlobalStore } from "../stores";

interface IChartProps {
  chartValues?: ICandleChartData[] | null;
  markers?: IMarkerData[];
}

export const Chart: FC<IChartProps> = ({ chartValues, markers }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<IChartApi | null>(null);
  const theme = useGlobalStore(state => state.theme);

  useEffect(() => {
    if (!chartRef.current || !chartValues || !markers) return;

    const handleChartClick = (event: MouseEventParams) => {
      console.log(event);
    };

    chartInstance.current = createChart(chartRef.current, {
      layout: {
        background: { color: theme.palette.background.default },
        textColor: theme.palette.text.primary,
      },
      grid: {
        vertLines: { color: theme.palette.divider },
        horzLines: { color: theme.palette.divider },
      },
    });

    const candlestickSeries = chartInstance.current.addCandlestickSeries({
      upColor: theme.palette.error.main,
      downColor: theme.palette.info.main,
      borderVisible: false,
      wickUpColor: theme.palette.error.main,
      wickDownColor: theme.palette.info.main,
    });

    candlestickSeries.setData(chartValues);
    candlestickSeries.setMarkers(markers);

    chartInstance.current.timeScale().fitContent();
    chartInstance.current.subscribeClick(handleChartClick);

    return () => {
      chartInstance.current?.unsubscribeClick(handleChartClick);
      chartInstance.current?.remove();
    };
  }, [chartRef, chartInstance, theme, chartValues, markers]);

  return <Box ref={chartRef} sx={{ width: "100%", height: "100%" }} />;
};
