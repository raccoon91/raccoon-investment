import { MouseEventHandler, useEffect } from "react";
import { Box } from "@mui/material";
import { SymbolList } from "../components";
import { useFavoriteStore } from "../stores";

export const FavoritePage = () => {
  const { favorites, getFavorites, deleteFavorite } = useFavoriteStore(state => ({
    favorites: state.favorites,
    getFavorites: state.getFavorites,
    deleteFavorite: state.deleteFavorite,
  }));

  useEffect(() => {
    getFavorites();
  }, [getFavorites]);

  const handleDeleteFavorite: MouseEventHandler<SVGSVGElement> = async e => {
    const symbolId = e.currentTarget.dataset["symbolId"];
    const symbol = favorites?.find(favorite => `${favorite.id}` === symbolId);

    if (!symbol) return;

    await deleteFavorite(symbol);
  };

  return (
    <Box sx={{ overflow: "auto", width: "100%", height: "100%" }}>
      <SymbolList symbolList={favorites} onDeleteFavorite={handleDeleteFavorite} />
    </Box>
  );
};
