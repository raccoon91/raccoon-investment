import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages";

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
          <Route index element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};
