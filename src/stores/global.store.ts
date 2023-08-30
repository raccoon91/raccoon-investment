import { create } from "zustand";

interface IGlobalStore {
  isLoad: boolean;
  mode: "dark" | "light";
  setIsLoad: (value: boolean) => void;
  toggleMode: () => void;
}

export const useGlobalStore = create<IGlobalStore>((set, get) => ({
  isLoad: false,
  mode: "dark",
  setIsLoad: (value: boolean) => {
    set({ isLoad: value });
  },
  toggleMode: () => {
    const mode = get().mode;

    set({ mode: mode === "dark" ? "light" : "dark" });
  },
}));
