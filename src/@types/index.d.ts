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
