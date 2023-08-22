import { create } from "zustand";
import { db } from "../db";
import { useGlobalStore } from ".";

interface IFavoriteStore {
  favorites: ISymbolData[];
  getFavorites: () => Promise<void>;
  deleteFavorite: (symbol?: ISymbolData) => Promise<void>;
  toggleFavorite: (symbol?: ISymbolData) => Promise<void>;
}

export const useFavoriteStore = create<IFavoriteStore>(set => ({
  favorites: [],
  getFavorites: async () => {
    useGlobalStore.getState().setIsLoad(true);

    const favorites = await db.favorites.toArray();

    set({ favorites });

    useGlobalStore.getState().setIsLoad(false);
  },
  deleteFavorite: async (symbolData?: ISymbolData) => {
    if (!symbolData) return;

    await db.favorites.delete(symbolData.symbol);

    const favorites = await db.favorites.toArray();

    set({ favorites });
  },
  toggleFavorite: async (symbolData?: ISymbolData) => {
    if (!symbolData) return;

    const isExist = await db.favorites.get(symbolData.symbol);

    if (isExist) {
      await db.favorites.delete(symbolData.symbol);
    } else {
      await db.favorites.add(symbolData);
    }

    const favorites = await db.favorites.toArray();

    set({ favorites });
  },
}));
