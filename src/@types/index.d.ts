type ISymbolData = {
  symbol: string;
  name: string;
  currency: string;
  exchange: string;
  mic_code: string;
  country: string;
  type: string;
};

type IETFData = { type: "ETF" } & ISymbolData;

type IStockData = { type: "Stock" } & ISymbolData;

type IChartMetaData = {
  symbol: string;
  interval: string;
  currency: string;
  exchange_timezone: string;
  exchange: string;
  mic_code: string;
  type: string;
};

type IChartValueData = {
  datetime: string;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
};

type IChartData = {
  meta: IChartMetaData;
  values: IChartValueData[];
};

type ICandleChartData = {
  symbol: string;
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
};

type IMarkerData = {
  symbol: string;
  time: string;
  position: "aboveBar" | "belowBar" | "inBar";
  color: string;
  shape: "circle" | "arrowDown" | "square" | "arrowUp";
  text: "dividen";
};
