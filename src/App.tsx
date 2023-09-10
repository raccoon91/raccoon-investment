import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import {
  CalculatePage,
  ChartPage,
  DividenPage,
  FavoritePage,
  HomePage,
  ProfitAndLossPage,
  SettingPage,
  SignInPage,
  SymbolPage,
  TradePage,
} from "./pages";
import { MainLayout } from "./layouts";
import { theme } from "./styles";

export const App = () => {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="symbols" element={<SymbolPage />} />
            <Route path="favorites" element={<FavoritePage />} />
            <Route path="charts" element={<ChartPage />} />

            <Route path="calculates" element={<CalculatePage />}>
              <Route index element={<ProfitAndLossPage />} />
              <Route path="trade" element={<TradePage />} />
            </Route>
            <Route path="settings" element={<SettingPage />}>
              <Route index element={<DividenPage />} />
            </Route>
          </Route>

          <Route path="signin" element={<SignInPage />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
};
