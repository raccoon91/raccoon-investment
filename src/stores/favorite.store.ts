import { create } from "zustand";
import { cloneDeep, differenceWith, flatMap, keyBy } from "lodash-es";
import { useGlobalStore } from "./global.store";
import { useUserStore } from "./user.store";
import { supabase } from "../db";

interface IFavoriteStore {
  groupList: IGroupData[] | null;
  copyGroupList: IGroupData[] | null;
  favoriteMap: Record<number, { id: number; order: number | null; group_id: number | null; symbol_id: number }>;
  getGroupData: () => Promise<void>;
  getFavoriteMap: () => Promise<void>;
  setCopyGroupList: (groupList: IGroupData[] | null) => void;
  saveGroupListOrder: () => Promise<void>;
  deleteFavorite: (favoriteId?: string) => Promise<void>;
  toggleFavorite: (symbolId?: string) => Promise<void>;
}

export const useFavoriteStore = create<IFavoriteStore>((set, get) => ({
  groupList: [],
  favoriteMap: {},
  copyGroupList: [],
  getGroupData: async () => {
    try {
      useGlobalStore.getState().setIsLoad(true);

      const { data } = await supabase
        .from("groups")
        .select(`*, favorites ( *, symbols ( * ))`)
        .order("order")
        .order("order", { foreignTable: "favorites" });

      set({ groupList: data ?? [], copyGroupList: cloneDeep(data ?? []) });
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
  setCopyGroupList: (groupList: IGroupData[] | null) => {
    set({ copyGroupList: groupList });
  },
  saveGroupListOrder: async () => {
    try {
      useGlobalStore.getState().setIsLoad(true);

      const groupList = get().groupList;
      const copyGroupList = get().copyGroupList;

      const groups = differenceWith(copyGroupList ?? [], groupList ?? [], (a, b) => a.order === b.order);
      const favorites = differenceWith(
        flatMap(copyGroupList ?? [], group => group.favorites),
        flatMap(groupList ?? [], group => group.favorites),
        (a, b) => a?.group_id === b?.group_id && a?.id === b?.id && a?.order === b?.order
      );

      await supabase.from("groups").upsert(
        groups.map(group => ({
          id: group.id,
          name: group.name,
          order: group?.order ?? null,
          user_id: group.user_id,
        }))
      );
      await supabase.from("favorites").upsert(
        favorites.map(favorite => ({
          id: favorite!.id,
          order: favorite?.order ?? null,
          symbol_id: favorite!.symbol_id,
          group_id: favorite!.group_id,
          user_id: favorite!.user_id,
        }))
      );

      set({ groupList: copyGroupList, copyGroupList: cloneDeep(copyGroupList) });
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
