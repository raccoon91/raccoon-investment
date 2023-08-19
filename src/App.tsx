import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages";
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
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};
