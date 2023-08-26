type ISymbolData = {
  id: number;
  ticker: string;
  name: string;
  country?: string | null;
  currency?: string | null;
  exchange?: string | null;
  mic_code?: string | null;
  type: string;
};

type ICandleChartData = {
  id: number;
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
};

type IMarkerData = {
  id: number;
  time: string;
  position: "aboveBar" | "belowBar" | "inBar";
  color: string;
  shape: "circle" | "arrowDown" | "square" | "arrowUp";
  text: "dividen";
};
