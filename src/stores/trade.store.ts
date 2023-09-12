import { create } from "zustand";
import { isNil, sortBy } from "lodash-es";
import { useUserStore } from "./user.store";
import { supabase } from "../db";

interface ITradeStore {
  trades: ITradeData[];
  getTradeData: (symbolId?: number) => Promise<void>;
  getAllTradeData: () => Promise<void>;
  saveTradeData: (trade: Omit<ITradeData, "position" | "shape">) => Promise<void>;
}

export const useTradeStore = create<ITradeStore>(set => ({
  trades: [],
  getTradeData: async (symbolId?: number) => {
    try {
      if (isNil(symbolId)) return;

      const { data } = await supabase.from("trades").select("*").eq("symbol_id", symbolId);

      const sortedTradeData = sortBy(data ?? [], "date");

      set({ trades: sortedTradeData });
    } catch (err) {
      console.error(err);
    }
  },
  getAllTradeData: async () => {
    try {
      const { data } = await supabase.from("trades").select("*");
      const sortedTradeData = sortBy(data ?? [], "date");

      set({ trades: sortedTradeData });
    } catch (err) {
      console.error(err);
    }
  },
  saveTradeData: async (trade: ITradeData) => {
    try {
      const user = useUserStore.getState().user;

      if (!user) return;

      await supabase
        .from("trades")
        .upsert({ ...trade, user_id: user.id })
        .select();
    } catch (err) {
      console.error(err);
    }
  },
}));
