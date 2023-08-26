import { CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ChartPage, HomePage, SymbolPage } from "./pages";
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
            <Route path="symbols" element={<SymbolPage />} />
            <Route path="charts/:symbolId" element={<ChartPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};
