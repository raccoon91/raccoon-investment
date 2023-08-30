import { useMemo } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { ChartPage, FavoritePage, HomePage, SignInPage, SymbolPage } from "./pages";
import { Layout } from "./layouts";
import { useGlobalStore } from "./stores";

export const App = () => {
  const mode = useGlobalStore(state => state.mode);

  const theme = useMemo(() => extendTheme({ initialColorMode: "dark", useSystemColorMode: true }), [mode]);

  return (
    <ChakraProvider resetCSS theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="symbols" element={<SymbolPage />} />
            <Route path="favorites" element={<FavoritePage />} />
            <Route path="charts/:symbolId" element={<ChartPage />} />
          </Route>

          <Route path="signin" element={<SignInPage />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
};
