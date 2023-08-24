import { Theme, createTheme } from "@mui/material";
import { create } from "zustand";

interface IGlobalStore {
  isLoad: boolean;
  mode: "dark" | "light";
  theme: Theme;
  setIsLoad: (value: boolean) => void;
  toggleMode: () => void;
}

export const useGlobalStore = create<IGlobalStore>((set, get) => ({
  isLoad: false,
  mode: "dark",
  theme: createTheme({ palette: { mode: "dark" } }),
  setIsLoad: (value: boolean) => {
    set({ isLoad: value });
  },
  toggleMode: () => {
    const mode = get().mode;
    const newMode = mode === "dark" ? "light" : "dark";

    set({
      mode: newMode,
      theme: createTheme({ palette: { mode: newMode } }),
    });
  },
}));
