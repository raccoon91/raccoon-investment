import { useCallback, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Box, CircularProgress, IconButton, Switch, Typography } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { Sidebar } from "./Sidebar";
import { useGlobalStore, useUserStore } from "../stores";

export const Layout = () => {
  const navigate = useNavigate();
  const isLoad = useGlobalStore(state => state.isLoad);
  const { user, getUser, signout } = useUserStore(state => ({
    user: state.user,
    getUser: state.getUser,
    signout: state.signout,
  }));
  const { mode, toggleMode } = useGlobalStore(state => ({
    mode: state.mode,
    toggleMode: state.toggleMode,
  }));

  const checkSignin = useCallback(async () => {
    if (user) return;

    const res = await getUser();

    if (res?.status === "ok") return;

    navigate("/signin");
  }, [user, getUser]);

  useEffect(() => {
    checkSignin();
  }, [checkSignin]);

  const handleSignOut = async () => {
    const res = await signout();

    if (res?.status === "ok") {
      navigate("/signin");
    }
  };

  const handleChangeThemeMode = () => {
    toggleMode();
  };

  if (!user) return null;

  return (
    <Box sx={{ overflow: "hidden", display: "flex", width: "100vw", height: "100vh" }}>
      <Box
        sx={{
          flex: "0 0 60px",
          width: "60px",
          borderRight: "1px solid",
          borderColor: "divider",
          padding: "48px 0",
          boxSizing: "content-box",
        }}
      >
        <Sidebar />
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flex: "0 0 48px",
            height: "48px",
            padding: "0 24px",
            borderBottom: "1px solid",
            borderColor: "divider",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: "24px" }}>
            <Typography>{user?.email ?? ""}</Typography>

            {user && (
              <IconButton size="small" color="primary" onClick={handleSignOut}>
                <LogoutIcon />
              </IconButton>
            )}
          </Box>

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
