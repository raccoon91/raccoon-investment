import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ETFPage, HomePage, StockPage } from "./pages";
import { Layout } from "./layouts";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="etf" element={<ETFPage />} />
            <Route path="stocks" element={<StockPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};
