import axios from "axios";
import { create } from "zustand";
import { db } from "../db";
import { useGlobalStore } from ".";

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
    const search = get().search;

    if (!search) {
      set({ stockList: null });

      return;
    }

    useGlobalStore.getState().setIsLoad(true);

    const stockList = await db.stocks.filter(stock => new RegExp(search).test(stock.name)).toArray();

    set({ stockList });

    useGlobalStore.getState().setIsLoad(false);
  },
  syncStockData: async () => {
    useGlobalStore.getState().setIsLoad(true);

    // const res = await axios.get<{ data: ISymbolData[] }>(`${import.meta.env.VITE_TWELVE_DATA_API}/stocks`, {
    //   params: {
    //     apikey: import.meta.env.VITE_TWELVE_DATA_API_KEY,
    //     country: "United States",
    //   },
    // });
    const res = await axios.get<{ data: ISymbolData[] }>("/stocks.json", {});

    const stockList: IStockData[] = res.data.data.map(stock => ({
      ...stock,
      type: "Stock",
    }));

    await db.stocks.bulkPut(stockList);

    useGlobalStore.getState().setIsLoad(false);
  },
}));
