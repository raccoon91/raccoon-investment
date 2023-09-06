type ISymbolData = {
  country: string | null;
  currency: string | null;
  exchange: string | null;
  id: number;
  mic_code: string | null;
  name: string;
  ticker: string;
  type: string;
};

type IFavoriteData = {
  id: number;
  order: number | null;
  group_id: number | null;
  user_id: string;
  symbol_id: number;
  symbols?: ISymbolData | null;
};

type IGroupData = {
  id: number;
  name: string;
  order: number | null;
  user_id: string;
  favorites?: IFavoriteData[] | null;
};

type ICandleChartData = {
  id: number;
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
};

type ITradeData = {
  id: string;
  time: string;
  type: "buy" | "sell";
  price: number;
  count: number;
  commission: number;
  position: "aboveBar" | "belowBar" | "inBar";
  shape: "circle" | "arrowDown" | "square" | "arrowUp";
  text: string;
};

type IMarkerData = {
  id: string;
  time: string;
  position: "aboveBar" | "belowBar" | "inBar";
  shape: "circle" | "arrowDown" | "square" | "arrowUp";
  text: string;
};
