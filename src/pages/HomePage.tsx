import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, Card, IconButton, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useFavoriteStore } from "../stores";

export const HomePage = () => {
  const { favorites, getFavorites } = useFavoriteStore(state => ({
    favorites: state.favorites,
    getFavorites: state.getFavorites,
  }));

  useEffect(() => {
    getFavorites();
  }, []);

  return (
    <Box sx={{ overflow: "auto", width: "100%", height: "100%" }}>
      <Box sx={{ display: "flex", gap: "16px" }}>
        <Card>
          <Box sx={{ display: "flex", alignItems: "center", gap: "12px", padding: "16px 8px 16px 24px" }}>
            <Typography>Favorites</Typography>
            <Typography>{favorites.length ?? "-"}</Typography>

            <IconButton component={Link} size="small" to="/favorites" sx={{ marginLeft: "16px" }}>
              <ArrowForwardIcon />
            </IconButton>
          </Box>
        </Card>
      </Box>
    </Box>
  );
};
