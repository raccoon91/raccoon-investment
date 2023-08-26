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

      set({ favorites });
    } catch (err) {
      console.error(err);
    } finally {
      useGlobalStore.getState().setIsLoad(false);
    }
  },
  deleteFavorite: async (symbol?: ISymbolData) => {
    try {
      if (!symbol) return;

      await db.favorites.delete(symbol.id);

      const favorites = await db.favorites.toArray();

      set({ favorites });
    } catch (err) {
      console.error(err);
    }
  },
  toggleFavorite: async (symbol?: ISymbolData) => {
    try {
      if (!symbol) return;

      const isExist = await db.favorites.get(symbol.id);

      if (isExist) {
        await db.favorites.delete(symbol.id);
      } else {
        await db.favorites.add(symbol);
      }

      const favorites = await db.favorites.toArray();

      set({ favorites });
    } catch (err) {
      console.error(err);
    }
  },
}));
