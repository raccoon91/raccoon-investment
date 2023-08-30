import { FC, useEffect, useRef } from "react";
import { IChartApi, MouseEventParams, createChart } from "lightweight-charts";
import { Box } from "@chakra-ui/react";

interface IChartProps {
  chartValues?: ICandleChartData[] | null;
  markers?: IMarkerData[];
}

export const Chart: FC<IChartProps> = ({ chartValues, markers }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<IChartApi | null>(null);

  useEffect(() => {
    if (!chartRef.current || !chartValues || !markers) return;

    const handleChartClick = (event: MouseEventParams) => {
      console.log(event);
    };

    chartInstance.current = createChart(chartRef.current, {
      layout: {
        background: { color: "black" },
        textColor: "white",
      },
      grid: {
        vertLines: { color: "gray" },
        horzLines: { color: "gray" },
      },
    });

    const candlestickSeries = chartInstance.current.addCandlestickSeries({
      upColor: "red",
      downColor: "blue",
      borderVisible: false,
      wickUpColor: "red",
      wickDownColor: "blue",
    });

    candlestickSeries.setData(chartValues);
    // candlestickSeries.setMarkers(markers);

    chartInstance.current.timeScale().fitContent();
    chartInstance.current.subscribeClick(handleChartClick);

    return () => {
      chartInstance.current?.unsubscribeClick(handleChartClick);
      chartInstance.current?.remove();
    };
  }, [chartRef, chartInstance, chartValues, markers]);

  return <Box ref={chartRef} w="full" h="full" />;
};
