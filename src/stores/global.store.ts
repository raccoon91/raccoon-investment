import { create } from "zustand";

interface IGlobalStore {
  isLoad: boolean;
  setIsLoad: (value: boolean) => void;
}

export const useGlobalStore = create<IGlobalStore>(set => ({
  isLoad: false,
  setIsLoad: (value: boolean) => {
    set({ isLoad: value });
  },
}));
