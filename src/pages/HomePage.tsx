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
    const symbolId = e.currentTarget.dataset["symbolId"];
    const symbol = favorites?.find(favorite => `${favorite.id}` === symbolId);

    if (!symbol) return;

    await deleteFavorite(symbol);
  };

  return (
    <Box sx={{ overflow: "auto", width: "100%", height: "100%" }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {favorites?.map(favorite => (
          <Card key={favorite.id} sx={{ display: "flex", alignItems: "center", padding: "8px 16px" }}>
            <Box sx={{ width: "100px" }}>
              <Chip label={favorite.ticker} />
            </Box>

            <Typography
              component={Link}
              to={`/charts/${favorite.id}`}
              sx={{ color: "text.primary", textDecoration: "none", "&:hover": { textDecoration: "underline" } }}
            >
              {favorite.name}
            </Typography>

            <CloseIcon
              sx={{ marginLeft: "auto", cursor: "pointer" }}
              data-symbol-id={favorite.id}
              onClick={handleClickDeleteFavorite}
            />
          </Card>
        ))}
      </Box>
    </Box>
  );
};
