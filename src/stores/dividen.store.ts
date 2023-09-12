import { create } from "zustand";
import { isNil, sortBy } from "lodash-es";
import { useUserStore } from "./user.store";
import { supabase } from "../db";

interface IDividenStore {
  dividens: IDividenData[];
  getDividenData: (symbolId?: string | null) => Promise<void>;
  saveDividenData: (dividen: Omit<IDividenData, "position" | "shape">) => Promise<void>;
}

export const useDividenStore = create<IDividenStore>(set => ({
  dividens: [],
  getDividenData: async (symbolId?: string | null) => {
    try {
      if (isNil(symbolId)) return;

      const { data } = await supabase.from("dividens").select("*").eq("symbol_id", symbolId);

      const sortedDividenData = sortBy(data ?? [], "date");

      set({ dividens: sortedDividenData });
    } catch (err) {
      console.error(err);
    }
  },
  saveDividenData: async (dividen: Omit<IDividenData, "position" | "shape">) => {
    try {
      const user = useUserStore.getState().user;

      if (!user) return;

      await supabase
        .from("dividens")
        .upsert({ ...dividen, user_id: user.id })
        .select();
    } catch (err) {
      console.error(err);
    }
  },
}));
