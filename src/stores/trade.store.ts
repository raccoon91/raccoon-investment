import { create } from "zustand";
import { sortBy } from "lodash-es";
import { db } from "../db";

interface ITradeStore {
  trades: ITradeData[];
  getTradeData: (symbolId?: number) => Promise<void>;
  saveTradeData: (trade: Omit<ITradeData, "position" | "shape">) => Promise<void>;
}

export const useTradeStore = create<ITradeStore>(set => ({
  trades: [],
  getTradeData: async (symbolId?: number) => {
    try {
      if (symbolId === undefined) return;

      const tradeData = await db.trades.where({ symbol_id: symbolId }).toArray();
      const sortedTradeData = sortBy(tradeData, "time");

      set({ trades: sortedTradeData });
    } catch (err) {
      console.error(err);
    }
  },
  saveTradeData: async (trade: Omit<ITradeData, "position" | "shape">) => {
    try {
      await db.trades.put({
        ...trade,
        position: "aboveBar",
        shape: "arrowDown",
      });
    } catch (err) {
      console.error(err);
    }
  },
}));
