import { FC, useEffect, useRef } from "react";
import { sortBy } from "lodash-es";
import { IChartApi, MouseEventParams, createChart } from "lightweight-charts";
import { Box } from "@chakra-ui/react";
import { useChartTheme } from "../../styles";

interface IChartProps {
  chartValues?: ICandleChartData[] | null;
  trades?: ITradeData[];
  dividens?: IDividenData[];
}

export const Chart: FC<IChartProps> = ({ chartValues, trades, dividens }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<IChartApi | null>(null);
  const chartTheme = useChartTheme();

  useEffect(() => {
    if (!chartRef.current || !chartValues || !dividens) return;

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
        ...(dividens ?? []).map(
          dividen =>
            ({
              ...dividen,
              time: dividen.date,
              position: "aboveBar",
              shape: "circle",
              color: chartTheme.greenMarker,
            }) as IChartMarkerData
        ),
        ...(trades ?? []).map(
          trade =>
            ({
              time: trade.date,
              position: "aboveBar",
              shape: "arrowDown",
              text: trade.text,
              color: trade.type === "buy" ? chartTheme.blueMarker : chartTheme.redMarker,
            }) as IChartMarkerData
        ),
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
  }, [chartRef, chartInstance, chartTheme, chartValues, trades, dividens]);

  return <Box ref={chartRef} w="full" h="full" />;
};
