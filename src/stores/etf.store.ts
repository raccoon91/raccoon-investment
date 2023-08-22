import axios from "axios";
import { create } from "zustand";
import { db } from "../db";
import { useGlobalStore } from ".";

interface IETFStore {
  search: string;
  etfList: IETFData[] | null;
  changeSearch: (value?: string) => void;
  getETFData: () => Promise<void>;
  pollingETFData: () => Promise<void>;
}

export const useETFStore = create<IETFStore>((set, get) => ({
  search: "",
  etfList: null,
  changeSearch: (value?: string) => {
    set({ search: value });
  },
  getETFData: async () => {
    const search = get().search;

    if (!search) {
      set({ etfList: null });

      return;
    }

    useGlobalStore.getState().setIsLoad(true);

    const etfList = await db.etfs.filter(etf => new RegExp(search).test(etf.name)).toArray();

    set({ etfList });

    useGlobalStore.getState().setIsLoad(false);
  },
  pollingETFData: async () => {
    useGlobalStore.getState().setIsLoad(true);

    const res = await axios.get<{ data: ISymbolData[] }>(`${import.meta.env.VITE_TWELVE_DATA_API}/etf`, {
      params: {
        apikey: import.meta.env.VITE_TWELVE_DATA_API_KEY,
        country: "United States",
      },
    });
    // const res = await axios.get<{ data: ISymbolData[] }>("/etf.json", {});

    const etfList: IETFData[] = res.data.data.map(etf => ({
      ...etf,
      type: "ETF",
    }));

    await db.etfs.bulkPut(etfList);

    useGlobalStore.getState().setIsLoad(false);
  },
}));
