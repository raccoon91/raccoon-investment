type ISymbolData = Supabase["public"]["Tables"]["symbols"]["Row"];

type IGroupData = {
  id: number;
  name: string;
  order: number | null;
  favorites: {
    id: number;
    order: number | null;
    symbols: {
      id: number;
      name: string;
      ticker: string;
      type: string;
    } | null;
  }[];
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
  id: string;
  time: string;
  position: "aboveBar" | "belowBar" | "inBar";
  color: string;
  shape: "circle" | "arrowDown" | "square" | "arrowUp";
  text: "dividen";
};
