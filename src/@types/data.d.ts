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

type IMarkerPosition = "aboveBar" | "belowBar" | "inBar";
type IMarkerShape = "circle" | "arrowDown" | "square" | "arrowUp";

type ITradeData = {
  symbol_id: number;
  date: string;
  type: string;
  price: number;
  count: number;
  commission: number;
  text: string;
};

type IDividenData = {
  symbol_id: number;
  date: string;
  text: string;
};

type IChartMarkerData = {
  time: string;
  position: IMarkerPosition;
  color: string;
  shape: IMarkerShape;
};

type ICandleChartData = {
  symbol_id: number;
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
};
