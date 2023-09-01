import { FC, useEffect, useRef } from "react";
import { IChartApi, MouseEventParams, createChart } from "lightweight-charts";
import { Box, useColorModeValue } from "@chakra-ui/react";

interface IChartProps {
  chartValues?: ICandleChartData[] | null;
  markers?: IMarkerData[];
}

export const Chart: FC<IChartProps> = ({ chartValues, markers }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<IChartApi | null>(null);
  const bg = useColorModeValue("#FFFFFFEB", "#1A202C");
  const text = useColorModeValue("#1A202C", "#FFFFFFEB");
  const border = useColorModeValue("#E2E8F0", "#FFFFFF3D");
  const up = useColorModeValue("#F56565", "#C53030");
  const down = useColorModeValue("#4299E1", "#2B6CB0");

  useEffect(() => {
    if (!chartRef.current || !chartValues || !markers) return;

    const handleChartClick = (event: MouseEventParams) => {
      console.log(event);
    };

    chartInstance.current = createChart(chartRef.current, {
      layout: {
        background: { color: bg },
        textColor: text,
      },
      grid: {
        vertLines: { color: border },
        horzLines: { color: border },
      },
    });

    const candlestickSeries = chartInstance.current.addCandlestickSeries({
      upColor: up,
      downColor: down,
      borderVisible: false,
      wickUpColor: up,
      wickDownColor: down,
    });

    candlestickSeries.setData(chartValues);
    // candlestickSeries.setMarkers(markers);

    chartInstance.current.timeScale().fitContent();
    chartInstance.current.subscribeClick(handleChartClick);

    return () => {
      chartInstance.current?.unsubscribeClick(handleChartClick);
      chartInstance.current?.remove();
    };
  }, [chartRef, chartInstance, bg, text, border, up, down, chartValues, markers]);

  return <Box ref={chartRef} w="full" h="full" />;
};
