import { create } from "zustand";
import { keyBy, sortBy } from "lodash-es";
import { useGlobalStore } from "./global.store";
import { useUserStore } from "./user.store";
import { supabase } from "../db";

type IFavoriteGroup = {
  name: string;
  order: number;
  favorites: {
    id: number;
    order: number;
    symbol: {
      id: number;
      name: string;
      ticker: string;
      type: string;
    } | null;
  }[];
};

interface IFavoriteStore {
  favoriteMap: Record<number, { id: number; order: number | null; group_id: number | null; symbol_id: number }>;
  favoriteGroupList: IFavoriteGroup[];
  getFavoriteMap: () => Promise<void>;
  getFavoriteData: () => Promise<void>;
  deleteFavorite: (favoriteId?: string) => Promise<void>;
  toggleFavorite: (symbolId?: string) => Promise<void>;
}

export const useFavoriteStore = create<IFavoriteStore>(set => ({
  favoriteMap: {},
  favoriteGroupList: [],
  getFavoriteMap: async () => {
    try {
      useGlobalStore.getState().setIsLoad(true);

      const { data } = await supabase.from("favorites").select("*");

      console.log(data);

      set({ favoriteMap: keyBy(data ?? [], "symbol_id") });
    } catch (err) {
      console.error(err);
    } finally {
      useGlobalStore.getState().setIsLoad(false);
    }
  },
  getFavoriteData: async () => {
    try {
      useGlobalStore.getState().setIsLoad(true);

      const { data } = await supabase.from("favorites").select(`
      id,
      order,
      symbols ( id, ticker, name, type ),
      groups ( id, name, order )
    `);

      const favoriteGroup = data?.reduce(
        (acc, cur) => {
          const group = cur.groups ?? { name: "No Group", order: null };
          const symbol = cur.symbols;

          if (!acc[group.name])
            acc[group.name] = {
              name: group.name,
              order: group?.order ?? Infinity,
              favorites: [],
            };

          acc[group.name].favorites.push({ id: cur.id, order: cur.order ?? Infinity, symbol });

          return acc;
        },
        {} as Record<string, IFavoriteGroup>
      );

      const favoriteGroupList = sortBy(Object.entries(favoriteGroup ?? {}), "order").map(([, group]) => ({
        ...group,
        favorites: sortBy(group.favorites, "order"),
      }));

      set({ favoriteGroupList });
    } catch (err) {
      console.error(err);
    } finally {
      useGlobalStore.getState().setIsLoad(false);
    }
  },
  deleteFavorite: async (favoriteId?: string) => {
    try {
      if (!favoriteId) return;

      await supabase.from("favorites").delete().eq("id", favoriteId);
    } catch (err) {
      console.error(err);
    }
  },
  toggleFavorite: async (symbolId?: string) => {
    try {
      if (!symbolId) return;

      const { data: favorite } = await supabase.from("favorites").select("*").eq("symbol_id", symbolId);

      if (favorite?.length) {
        await supabase.from("favorites").delete().eq("symbol_id", symbolId);
      } else {
        const user = useUserStore.getState().user;

        if (!user?.id) return;

        await supabase.from("favorites").insert({
          symbol_id: Number(symbolId),
          user_id: user.id,
        });
      }
    } catch (err) {
      console.error(err);
    }
  },
}));
