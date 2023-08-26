type ITwelveSymbolData = {
  symbol: string;
  name: string;
  currency: string;
  exchange: string;
  mic_code: string;
  country: string;
  type: string;
};

type ITwelveChartData = {
  meta: {
    symbol: string;
    interval: string;
    currency: string;
    exchange_timezone: string;
    exchange: string;
    mic_code: string;
    type: string;
  };
  values: {
    datetime: string;
    open: string;
    high: string;
    low: string;
    close: string;
    volume: string;
  }[];
};
