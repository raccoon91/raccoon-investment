type ICandleChartData = {
  id: number;
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
};

type IMarkerData = {
  id: string;
  time: string;
  position: "aboveBar" | "belowBar" | "inBar";
  color: string;
  shape: "circle" | "arrowDown" | "square" | "arrowUp";
  text: "dividen";
};
