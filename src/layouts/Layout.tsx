import { Outlet } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import { Sidebar } from "./Sidebar";
import { useGlobalStore } from "../stores";

export const Layout = () => {
  const isLoad = useGlobalStore(state => state.isLoad);

  return (
    <Box sx={{ overflow: "hidden", display: "flex", width: "100vw", height: "100vh" }}>
      <Box sx={{ flex: "0 0 240px", width: "240px", borderRight: "1px solid", borderColor: "gray", padding: "48px 0" }}>
        <Sidebar />
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <Box sx={{ flex: "0 0 48px", height: "48px", borderBottom: "1px solid", borderColor: "gray" }}></Box>

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
