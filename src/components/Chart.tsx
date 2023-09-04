import { FC, useEffect, useRef } from "react";
import { IChartApi, MouseEventParams, createChart } from "lightweight-charts";
import { Box } from "@chakra-ui/react";
import { useChartTheme } from "../styles";
import { sortBy } from "lodash-es";

interface IChartProps {
  chartValues?: ICandleChartData[] | null;
  trades?: ITradeData[];
  markers?: IMarkerData[];
}

export const Chart: FC<IChartProps> = ({ chartValues, trades, markers }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<IChartApi | null>(null);
  const chartTheme = useChartTheme();

  useEffect(() => {
    if (!chartRef.current || !chartValues || !markers) return;

    const handleChartClick = (event: MouseEventParams) => {
      console.log(event);
    };

    chartInstance.current = createChart(chartRef.current, {
      layout: {
        background: { color: chartTheme.bg },
        textColor: chartTheme.text,
      },
      grid: {
        vertLines: { color: chartTheme.border },
        horzLines: { color: chartTheme.border },
      },
    });

    const candlestickSeries = chartInstance.current.addCandlestickSeries({
      upColor: chartTheme.up,
      downColor: chartTheme.down,
      borderVisible: false,
      wickUpColor: chartTheme.up,
      wickDownColor: chartTheme.down,
    });

    candlestickSeries.setData(chartValues);

    const allMarkers = sortBy(
      [
        ...(markers ?? []).map(marker => ({
          ...marker,
          color: chartTheme.greenMarker,
        })),
        ...(trades ?? []).map(trade => ({
          ...trade,
          color: trade.type === "buy" ? chartTheme.blueMarker : chartTheme.redMarker,
        })),
      ],
      "time"
    );

    candlestickSeries.setMarkers(allMarkers);

    chartInstance.current.timeScale().fitContent();
    chartInstance.current.subscribeClick(handleChartClick);

    return () => {
      chartInstance.current?.unsubscribeClick(handleChartClick);
      chartInstance.current?.remove();
    };
  }, [chartRef, chartInstance, chartTheme, chartValues, trades, markers]);

  return <Box ref={chartRef} w="full" h="full" />;
};
