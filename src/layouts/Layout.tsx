import { Outlet } from "react-router-dom";
import { Box, CircularProgress, Switch } from "@mui/material";
import { Sidebar } from "./Sidebar";
import { useGlobalStore } from "../stores";

export const Layout = () => {
  const isLoad = useGlobalStore(state => state.isLoad);
  const { mode, toggleMode } = useGlobalStore(state => ({
    mode: state.mode,
    toggleMode: state.toggleMode,
  }));

  const handleChangeThemeMode = () => {
    toggleMode();
  };

  return (
    <Box sx={{ overflow: "hidden", display: "flex", width: "100vw", height: "100vh" }}>
      <Box
        sx={{
          flex: "0 0 240px",
          width: "240px",
          borderRight: "1px solid",
          borderColor: "divider",
          padding: "48px 0",
        }}
      >
        <Sidebar />
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            flex: "0 0 48px",
            height: "48px",
            padding: "0 24px",
            borderBottom: "1px solid",
            borderColor: "divider",
          }}
        >
          <Switch checked={mode === "dark"} onChange={handleChangeThemeMode} />
        </Box>

        <Box sx={{ position: "relative", overflow: "hidden", flex: 1, padding: "30px" }}>
          {isLoad && (
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100%",
              }}
            >
              <CircularProgress />
            </Box>
          )}

          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};
