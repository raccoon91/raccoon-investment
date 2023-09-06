import dayjs from "dayjs";
import { cloneDeep, sortBy } from "lodash-es";
import { create } from "zustand";
import { db } from "../db";

interface ITradeStore {
  trades: ITradeData[];
  tradeJson: string;
  addTrade: (symbolId?: string | null, type?: "buy" | "sell", price?: string) => void;
  changeTrade: (value?: string) => void;
  getTradeData: (symbolId?: string | null) => Promise<void>;
  saveTradeData: () => Promise<void>;
}

export const useTradeStore = create<ITradeStore>((set, get) => ({
  trades: [],
  tradeJson: "",
  addTrade: (symbolId?: string | null, type?: "buy" | "sell") => {
    if (!symbolId || !type) return;

    const trades = cloneDeep(get().trades ?? []);

    trades.unshift({
      id: symbolId,
      time: dayjs().format("YYYY-MM-DD"),
      type,
      price: 0,
      count: 0,
      commission: type === "buy" ? 0.1 : 0.1,
      position: "aboveBar",
      shape: type === "buy" ? "arrowDown" : "arrowUp",
      text: type,
    });

    set({ tradeJson: JSON.stringify(trades, null, 4) });
  },
  changeTrade: (value?: string) => {
    try {
      if (!value) return;

      set({ tradeJson: value });
    } catch (err) {
      console.error(err);
    }
  },
  getTradeData: async (symbolId?: string | null) => {
    try {
      if (!symbolId) return;

      const tradeData = await db.trades.where({ id: symbolId }).toArray();
      const sortedTradeData = sortBy(tradeData, "time");

      set({ trades: sortedTradeData, tradeJson: JSON.stringify(sortedTradeData, null, 4) });
    } catch (err) {
      console.error(err);
    }
  },
  saveTradeData: async () => {
    try {
      const tradeJson = get().tradeJson;
      const trades: ITradeData[] = JSON.parse(tradeJson);

      await db.trades.bulkPut(trades);

      set({ trades });
    } catch (err) {
      console.error(err);
    }
  },
}));
