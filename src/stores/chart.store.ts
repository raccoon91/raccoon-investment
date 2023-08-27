import axios from "axios";
import { create } from "zustand";
import { sortBy, uniqBy } from "lodash-es";
import { useGlobalStore } from "./global.store";
import { db } from "../db";

type IChartInterval = "1min" | "5min" | "15min" | "30min" | "45min" | "1h" | "2h" | "4h" | "1day" | "1week" | "1month";

interface IChartStore {
  symbol: ISymbolData | null;
  chartValues?: ICandleChartData[] | null;
  getChartData: (symbolId?: string, interval?: IChartInterval) => Promise<void>;
  syncChartData: (symbolId?: string, interval?: IChartInterval) => Promise<void>;
  clearChartData: () => void;
}

export const useChartStore = create<IChartStore>(set => ({
  symbol: null,
  chartValues: null,
  getChartData: async (symbolId?: string) => {
    try {
      if (!symbolId) return;

      useGlobalStore.getState().setIsLoad(true);

      const symbol = await db.favorites.get(Number(symbolId));
      const chartValues = await db.charts.where({ id: Number(symbolId) }).toArray();
      const sortedChartValues = sortBy(chartValues, "time");

      set({ symbol, chartValues: sortedChartValues });
    } catch (err) {
      console.error(err);
    } finally {
      useGlobalStore.getState().setIsLoad(false);
    }
  },
  syncChartData: async (symbolId?: string, interval = "1week") => {
    try {
      if (!symbolId) return;

      useGlobalStore.getState().setIsLoad(true);

      const symbol = await db.favorites.get(Number(symbolId));

      if (symbol) {
        const res = await axios.get<ITwelveChartData>(`${import.meta.env.VITE_TWELVE_DATA_API}/time_series`, {
          params: {
            apikey: import.meta.env.VITE_TWELVE_DATA_API_KEY,
            symbol: symbol.ticker,
            interval,
            type: symbol.type,
            country: "United States",
            outputsize: 5000,
          },
        });

        const chartData = uniqBy(res?.data?.values ?? [], data => data.datetime).map(data => ({
          id: symbol.id,
          time: data.datetime,
          open: Number(data.open),
          high: Number(data.high),
          low: Number(data.low),
          close: Number(data.close),
        }));

        await db.charts.bulkPut(chartData);
      }
    } catch (err) {
      console.error(err);
    } finally {
      useGlobalStore.getState().setIsLoad(false);
    }
  },
  clearChartData: () => {
    set({ symbol: null, chartValues: null });
  },
}));
