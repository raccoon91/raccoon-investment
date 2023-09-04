import dayjs from "dayjs";
import { cloneDeep, sortBy } from "lodash-es";
import { create } from "zustand";
import { db } from "../db";

interface IMarkerStore {
  markers: IMarkerData[];
  markerJson: string;
  addMarker: (symbolId?: string) => void;
  changeMarker: (value?: string) => void;
  getMarkerData: (symbolId?: string) => Promise<void>;
  saveMarkerData: () => Promise<void>;
}

export const useMarkerStore = create<IMarkerStore>((set, get) => ({
  markers: [],
  markerJson: "",
  addMarker: (symbolId?: string) => {
    if (!symbolId) return;

    const markers = cloneDeep(get().markers ?? []);

    markers.unshift({
      id: symbolId,
      time: dayjs().format("YYYY-MM-DD"),
      position: "aboveBar",
      shape: "circle",
      text: "dividen",
    });

    set({ markerJson: JSON.stringify(markers, null, 4) });
  },
  changeMarker: (value?: string) => {
    try {
      if (!value) return;

      set({ markerJson: value });
    } catch (err) {
      console.error(err);
    }
  },
  getMarkerData: async (symbolId?: string) => {
    try {
      if (!symbolId) return;

      const markerData = await db.markers.where({ id: symbolId }).toArray();
      const sortedMarkerData = sortBy(markerData, "time");

      set({ markers: sortedMarkerData, markerJson: JSON.stringify(sortedMarkerData, null, 4) });
    } catch (err) {
      console.error(err);
    }
  },
  saveMarkerData: async () => {
    try {
      const markerJson = get().markerJson;
      const markers: IMarkerData[] = JSON.parse(markerJson);

      await db.markers.bulkPut(markers);

      set({ markers });
    } catch (err) {
      console.error(err);
    }
  },
}));
