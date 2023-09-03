import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { CalculatePage, ChartPage, FavoritePage, HomePage, SignInPage, SymbolPage } from "./pages";
import { Layout } from "./layouts";
import { theme } from "./styles";

export const App = () => {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="symbols" element={<SymbolPage />} />
            <Route path="favorites" element={<FavoritePage />} />
            <Route path="calculates" element={<CalculatePage />} />
            <Route path="charts/:symbolId" element={<ChartPage />} />
          </Route>

          <Route path="signin" element={<SignInPage />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
};
