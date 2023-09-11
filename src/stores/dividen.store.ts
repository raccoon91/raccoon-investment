import { create } from "zustand";
import { sortBy } from "lodash-es";
import { useUserStore } from "./user.store";
import { supabase } from "../db";

interface IDividenStore {
  dividens: IDividenData[];
  getDividenData: (symbolId?: number) => Promise<void>;
  saveDividenData: (dividen: Omit<IDividenData, "position" | "shape">) => Promise<void>;
}

export const useDividenStore = create<IDividenStore>(set => ({
  dividens: [],
  getDividenData: async (symbolId?: number) => {
    try {
      if (symbolId === undefined) return;

      // const dividenData = await db.dividens.where({ symbol_id: symbolId }).toArray();

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
