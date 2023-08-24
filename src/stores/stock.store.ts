import axios from "axios";
import { create } from "zustand";
import { useGlobalStore } from "./global.store";
import { db } from "../db";

interface IStockStore {
  search: string;
  stockList: IStockData[] | null;
  changeSearch: (value?: string) => void;
  getStockData: () => Promise<void>;
  syncStockData: () => Promise<void>;
}

export const useStockStore = create<IStockStore>((set, get) => ({
  search: "",
  stockList: null,
  changeSearch: (value?: string) => {
    set({ search: value });
  },
  getStockData: async () => {
    try {
      const search = get().search;

      if (!search) {
        set({ stockList: null });

        return;
      }

      useGlobalStore.getState().setIsLoad(true);

      const stockList = await db.stocks.filter(stock => new RegExp(search).test(stock.name.toLowerCase())).toArray();

      set({ stockList });
    } catch (err) {
      console.error(err);
    } finally {
      useGlobalStore.getState().setIsLoad(false);
    }
  },
  syncStockData: async () => {
    try {
      useGlobalStore.getState().setIsLoad(true);

      const res = await axios.get<{ data: ISymbolData[] }>(`${import.meta.env.VITE_TWELVE_DATA_API}/stocks`, {
        params: {
          apikey: import.meta.env.VITE_TWELVE_DATA_API_KEY,
          country: "United States",
        },
      });

      const stockList: IStockData[] = res.data.data.map(stock => ({
        ...stock,
        type: "Stock",
      }));

      await db.stocks.bulkPut(stockList);
    } catch (err) {
      console.error(err);
    } finally {
      useGlobalStore.getState().setIsLoad(false);
    }
  },
}));
