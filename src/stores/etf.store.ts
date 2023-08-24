import axios from "axios";
import { create } from "zustand";
import { useGlobalStore } from "./global.store";
import { db } from "../db";

interface IETFStore {
  search: string;
  etfList: IETFData[] | null;
  changeSearch: (value?: string) => void;
  getETFData: () => Promise<void>;
  syncETFData: () => Promise<void>;
}

export const useETFStore = create<IETFStore>((set, get) => ({
  search: "",
  etfList: null,
  changeSearch: (value?: string) => {
    set({ search: value });
  },
  getETFData: async () => {
    try {
      const search = get().search;

      if (!search) {
        set({ etfList: null });

        return;
      }

      useGlobalStore.getState().setIsLoad(true);

      const etfList = await db.etfs.filter(etf => new RegExp(search).test(etf.name.toLowerCase())).toArray();

      useGlobalStore.getState().setIsLoad(false);

      set({ etfList });
    } catch (err) {
      console.error(err);
    }
  },
  syncETFData: async () => {
    useGlobalStore.getState().setIsLoad(true);

    const res = await axios.get<{ data: ISymbolData[] }>(`${import.meta.env.VITE_TWELVE_DATA_API}/etf`, {
      params: {
        apikey: import.meta.env.VITE_TWELVE_DATA_API_KEY,
        country: "United States",
      },
    });

    const etfList: IETFData[] = res.data.data.map(etf => ({
      ...etf,
      type: "ETF",
    }));

    useGlobalStore.getState().setIsLoad(false);

    await db.etfs.bulkPut(etfList);
  },
}));
