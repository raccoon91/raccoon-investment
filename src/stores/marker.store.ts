import { create } from "zustand";
import { db } from "../db";
import dayjs from "dayjs";
import { sortBy } from "lodash-es";

interface IMarkerStore {
  markers: IMarkerData[];
  markerJson: string;
  addMarker: (symbol?: string | null) => void;
  changeMarker: (value?: string) => void;
  getMarkerData: (symbol?: string | null) => Promise<void>;
  saveMarkerData: (symbol?: string | null) => Promise<void>;
}

export const useMarkerStore = create<IMarkerStore>((set, get) => ({
  markers: [],
  markerJson: "",
  addMarker: (symbol?: string | null) => {
    if (!symbol) return;

    const markers = get().markers;

    markers.unshift({
      symbol,
      time: dayjs().format("YYYY-MM-DD"),
      position: "aboveBar",
      color: "#388E3C",
      shape: "arrowDown",
      text: "dividen",
    });

    set({ markers, markerJson: JSON.stringify(markers, null, 4) });
  },
  changeMarker: (value?: string) => {
    try {
      if (!value) return;

      set({ markerJson: value });
    } catch (err) {
      console.error(err);
    }
  },
  getMarkerData: async (symbol?: string | null) => {
    try {
      if (!symbol) return;

      const markerData = await db.markers.where({ symbol }).toArray();
      const sortedMarkerData = sortBy(markerData, "time");

      set({ markers: sortedMarkerData, markerJson: JSON.stringify(sortedMarkerData, null, 4) });
    } catch (err) {
      console.error(err);
    }
  },
  saveMarkerData: async (symbol?: string | null) => {
    try {
      if (!symbol) return;

      const markerJson = get().markerJson;
      const markers = JSON.parse(markerJson);

      await db.markers.bulkPut(markers);

      set({ markers });
    } catch (err) {
      console.error(err);
    }
  },
}));
