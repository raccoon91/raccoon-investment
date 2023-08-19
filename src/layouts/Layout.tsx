import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import { Sidebar } from "./Sidebar";

export const Layout = () => {
  return (
    <Box sx={{ overflow: "hidden", display: "flex", width: "100vw", height: "100vh" }}>
      <Box sx={{ width: "240px", borderRight: "1px solid", borderColor: "gray", padding: "48px 0" }}>
        <Sidebar />
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <Box sx={{ height: "48px", borderBottom: "1px solid", borderColor: "gray" }}></Box>

        <Box sx={{ flex: 1, padding: "30px" }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};
