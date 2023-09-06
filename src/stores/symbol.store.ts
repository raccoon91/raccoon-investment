import axios from "axios";
import { create } from "zustand";
import { useGlobalStore } from "./global.store";
import { supabase } from "../db";

interface ISymbolStore {
  column: string;
  search: string;
  symbol: ISymbolData | null;
  symbolList: ISymbolData[] | null;
  changeColumn: (value?: string) => void;
  changeSearch: (value?: string) => void;
  getSymbolData: (symbolId?: string | null) => Promise<void>;
  searchSymbolData: () => Promise<void>;
  syncSymbolData: () => Promise<void>;
}

export const useSymbolStore = create<ISymbolStore>((set, get) => ({
  column: "ticker",
  search: "",
  symbol: null,
  symbolList: null,
  changeColumn: (value?: string) => {
    set({ column: value });
  },
  changeSearch: (value?: string) => {
    set({ search: value });
  },
  getSymbolData: async (symbolId?: string | null) => {
    try {
      if (!symbolId) {
        set({ symbol: null });

        return;
      }

      useGlobalStore.getState().setIsLoad(true);

      const { data } = await supabase.from("symbols").select("*").eq("id", symbolId).maybeSingle();

      set({ symbol: data ?? null });
    } catch (err) {
      console.error(err);
    } finally {
      useGlobalStore.getState().setIsLoad(false);
    }
  },
  searchSymbolData: async () => {
    try {
      const column = get().column;
      const search = get().search;

      if (!search) {
        set({ symbolList: null });

        return;
      }

      useGlobalStore.getState().setIsLoad(true);

      const { data } = await supabase.from("symbols").select("*").ilike(column, `%${search}%`);

      set({ symbolList: data ?? [] });
    } catch (err) {
      console.error(err);
    } finally {
      useGlobalStore.getState().setIsLoad(false);
    }
  },
  syncSymbolData: async () => {
    try {
      useGlobalStore.getState().setIsLoad(true);

      const res = await axios.get<{ data: ITwelveSymbolData[] }>(`${import.meta.env.VITE_TWELVE_DATA_API}/symbols`, {
        params: {
          apikey: import.meta.env.VITE_TWELVE_DATA_API_KEY,
          country: "United States",
        },
      });

      const symbolList = res.data.data.map(symbol => ({
        ticker: symbol.symbol,
        name: symbol.name,
        country: symbol.country,
        currency: symbol.currency,
        exchange: symbol.exchange,
        mic_code: symbol.mic_code,
        type: "Symbol",
      }));

      const { data } = await supabase.from("symbols").upsert(symbolList).select();

      set({ symbolList: data ?? [] });
    } catch (err) {
      console.error(err);
    } finally {
      useGlobalStore.getState().setIsLoad(false);
    }
  },
}));
