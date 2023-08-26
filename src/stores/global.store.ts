import { Theme, createTheme } from "@mui/material";
import { create } from "zustand";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#42a5f5" },
    secondary: { main: "#4cc38a" },
    background: { default: "#1c1c1c", paper: "#1c1c1c" },
  },
});

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#42a5f5" },
    secondary: { main: "#4cc38a" },
  },
});

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
  theme: darkTheme,
  setIsLoad: (value: boolean) => {
    set({ isLoad: value });
  },
  toggleMode: () => {
    const mode = get().mode;

    set({
      mode: mode === "dark" ? "light" : "dark",
      theme: mode === "dark" ? lightTheme : darkTheme,
    });
  },
}));
