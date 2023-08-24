import { CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ChartPage, ETFPage, HomePage, StockPage } from "./pages";
import { Layout } from "./layouts";
import { useGlobalStore } from "./stores";

export const App = () => {
  const theme = useGlobalStore(state => state.theme);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="etf" element={<ETFPage />} />
            <Route path="stocks" element={<StockPage />} />
            <Route path="chart" element={<ChartPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};
