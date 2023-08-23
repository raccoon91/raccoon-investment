import { MouseEventHandler, useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, Card, Chip, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useFavoriteStore } from "../stores";

export const HomePage = () => {
  const { favorites, getFavorites, deleteFavorite } = useFavoriteStore(state => ({
    favorites: state.favorites,
    getFavorites: state.getFavorites,
    deleteFavorite: state.deleteFavorite,
  }));

  useEffect(() => {
    getFavorites();
  }, [getFavorites]);

  const handleClickDeleteFavorite: MouseEventHandler<SVGSVGElement> = async e => {
    const symbol = e.currentTarget.dataset["symbol"];
    const symbolData = favorites?.find(favorite => favorite.symbol === symbol);

    if (!symbolData) return;

    await deleteFavorite(symbolData);
  };

  return (
    <Box sx={{ overflow: "auto", width: "100%", height: "100%" }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {favorites?.map(favorite => (
          <Card key={favorite.symbol} sx={{ display: "flex", alignItems: "center", padding: "8px 16px" }}>
            <Box sx={{ width: "100px" }}>
              <Chip label={favorite.symbol} />
            </Box>

            <Typography
              component={Link}
              to={`/chart?symbol=${favorite.symbol}&type=${favorite.type}`}
              sx={{ color: "text.primary", textDecoration: "none", "&:hover": { textDecoration: "underline" } }}
            >
              {favorite.name}
            </Typography>

            <CloseIcon
              sx={{ marginLeft: "auto", cursor: "pointer" }}
              data-symbol={favorite.symbol}
              onClick={handleClickDeleteFavorite}
            />
          </Card>
        ))}
      </Box>
    </Box>
  );
};
