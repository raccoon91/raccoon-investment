import { create } from "zustand";
import { useGlobalStore } from "./global.store";
import { db } from "../db";

interface IFavoriteStore {
  favorites: ISymbolData[];
  getFavorites: () => Promise<void>;
  deleteFavorite: (symbol?: ISymbolData) => Promise<void>;
  toggleFavorite: (symbol?: ISymbolData) => Promise<void>;
}

export const useFavoriteStore = create<IFavoriteStore>(set => ({
  favorites: [],
  getFavorites: async () => {
    try {
      useGlobalStore.getState().setIsLoad(true);

      const favorites = await db.favorites.toArray();

      useGlobalStore.getState().setIsLoad(false);

      set({ favorites });
    } catch (err) {
      console.error(err);
    }
  },
  deleteFavorite: async (symbolData?: ISymbolData) => {
    try {
      if (!symbolData) return;

      await db.favorites.delete(symbolData.symbol);

      const favorites = await db.favorites.toArray();

      set({ favorites });
    } catch (err) {
      console.error(err);
    }
  },
  toggleFavorite: async (symbolData?: ISymbolData) => {
    try {
      if (!symbolData) return;

      const isExist = await db.favorites.get(symbolData.symbol);

      if (isExist) {
        await db.favorites.delete(symbolData.symbol);
      } else {
        await db.favorites.add(symbolData);
      }

      const favorites = await db.favorites.toArray();

      set({ favorites });
    } catch (err) {
      console.error(err);
    }
  },
}));
