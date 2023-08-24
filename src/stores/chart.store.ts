import axios from "axios";
import { create } from "zustand";
import { sortBy, uniqBy } from "lodash-es";
import { useGlobalStore } from "./global.store";
import { db } from "../db";

type IChartInterval = "1min" | "5min" | "15min" | "30min" | "45min" | "1h" | "2h" | "4h" | "1day" | "1week" | "1month";

interface IChartStore {
  symbolData: ISymbolData | null;
  chartValues?: ICandleChartData[] | null;
  getChartData: (symbol?: string, type?: string, interval?: IChartInterval) => Promise<void>;
  syncChartData: (symbol?: string, type?: string, interval?: IChartInterval) => Promise<void>;
}

export const useChartStore = create<IChartStore>(set => ({
  symbolData: null,
  chartValues: null,
  getChartData: async (symbol?: string, type?: string) => {
    try {
      if (!symbol) return;

      useGlobalStore.getState().setIsLoad(true);

      let symbolData: ISymbolData | null = null;

      if (type === "ETF") {
        symbolData = (await db.etfs.get(symbol)) ?? null;
      } else if (type === "Stock") {
        symbolData = (await db.stocks.get(symbol)) ?? null;
      }

      const chartValues = await db.charts.where({ symbol }).toArray();
      const sortedChartValues = sortBy(chartValues, "time");

      set({ symbolData, chartValues: sortedChartValues });
    } catch (err) {
      console.error(err);
    } finally {
      useGlobalStore.getState().setIsLoad(false);
    }
  },
  syncChartData: async (symbol?: string, type?: string, interval = "1week") => {
    try {
      if (!symbol || !type) return;

      useGlobalStore.getState().setIsLoad(true);

      const res = await axios.get<{ meta: IChartMetaData; values: IChartValueData[] }>(
        `${import.meta.env.VITE_TWELVE_DATA_API}/time_series`,
        {
          params: {
            apikey: import.meta.env.VITE_TWELVE_DATA_API_KEY,
            symbol,
            interval,
            type,
            country: "United States",
            outputsize: 5000,
          },
        }
      );

      const chartData = uniqBy(res?.data?.values ?? [], data => data.datetime).map(data => ({
        symbol,
        time: data.datetime,
        open: Number(data.open),
        high: Number(data.high),
        low: Number(data.low),
        close: Number(data.close),
      }));

      await db.charts.bulkPut(chartData);
    } catch (err) {
      console.error(err);
    } finally {
      useGlobalStore.getState().setIsLoad(false);
    }
  },
}));
