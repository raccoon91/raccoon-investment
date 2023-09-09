import { sortBy } from "lodash-es";
import { create } from "zustand";
import { db } from "../db";

interface IMarkerStore {
  markers: IMarkerData[];
  getMarkerData: (symbolId?: number) => Promise<void>;
  saveMarkerData: (marker: Omit<IMarkerData, "position" | "shape">) => Promise<void>;
}

export const useMarkerStore = create<IMarkerStore>(set => ({
  markers: [],
  getMarkerData: async (symbolId?: number) => {
    try {
      if (symbolId === undefined) return;

      const markerData = await db.markers.where({ symbol_id: symbolId }).toArray();
      const sortedMarkerData = sortBy(markerData, "time");

      set({ markers: sortedMarkerData });
    } catch (err) {
      console.error(err);
    }
  },
  saveMarkerData: async (marker: Omit<IMarkerData, "position" | "shape">) => {
    try {
      await db.markers.put({
        ...marker,
        position: "aboveBar",
        shape: "circle",
      });
    } catch (err) {
      console.error(err);
    }
  },
}));
