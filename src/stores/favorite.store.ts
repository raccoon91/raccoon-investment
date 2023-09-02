import { create } from "zustand";
import { keyBy } from "lodash-es";
import { useGlobalStore } from "./global.store";
import { useUserStore } from "./user.store";
import { supabase } from "../db";

interface IFavoriteStore {
  groupList: IGroupData[];
  favoriteMap: Record<number, { id: number; order: number | null; group_id: number | null; symbol_id: number }>;
  getGroupData: () => Promise<void>;
  getFavoriteMap: () => Promise<void>;
  deleteFavorite: (favoriteId?: string) => Promise<void>;
  toggleFavorite: (symbolId?: string) => Promise<void>;
}

export const useFavoriteStore = create<IFavoriteStore>(set => ({
  groupList: [],
  favoriteMap: {},
  getGroupData: async () => {
    try {
      useGlobalStore.getState().setIsLoad(true);

      const { data } = await supabase
        .from("groups")
        .select(
          `
            id, name, order,
            favorites (
              id, order,
              symbols ( id, name, ticker, type )
            )
          `
        )
        .order("order");

      set({ groupList: data ?? [] });
    } catch (err) {
      console.error(err);
    } finally {
      useGlobalStore.getState().setIsLoad(false);
    }
  },
  getFavoriteMap: async () => {
    try {
      useGlobalStore.getState().setIsLoad(true);

      const { data } = await supabase.from("favorites").select("*");

      set({ favoriteMap: keyBy(data ?? [], "symbol_id") });
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

      const { data } = await supabase.from("favorites").select("*").eq("symbol_id", symbolId).maybeSingle();

      if (data) {
        await supabase.from("favorites").delete().eq("symbol_id", symbolId);
      } else {
        const user = useUserStore.getState().user;

        if (!user?.id) return;

        const { data: group } = await supabase.from("groups").select("*").eq("name", "None").maybeSingle();

        await supabase.from("favorites").insert({
          symbol_id: Number(symbolId),
          user_id: user.id,
          group_id: group?.id ?? null,
        });
      }
    } catch (err) {
      console.error(err);
    }
  },
}));
