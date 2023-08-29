import { MouseEventHandler, useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, Card, Chip, Divider, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useFavoriteStore } from "../stores";

export const FavoritePage = () => {
  const { favoriteGroupList, getFavoriteData, deleteFavorite } = useFavoriteStore(state => ({
    favoriteGroupList: state.favoriteGroupList,
    getFavoriteData: state.getFavoriteData,
    deleteFavorite: state.deleteFavorite,
  }));

  useEffect(() => {
    getFavoriteData();
  }, []);

  const handleDeleteFavorite: MouseEventHandler<SVGSVGElement> = async e => {
    const favoriteId = e.currentTarget.dataset["favoriteId"];

    if (!favoriteId) return;

    await deleteFavorite(favoriteId);
    await getFavoriteData();
  };

  return (
    <Box sx={{ overflow: "auto", width: "100%", height: "100%" }}>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
        {favoriteGroupList.map(group => (
          <Card key={group.name}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "16px", padding: "16px" }}>
              <Typography>{group.name}</Typography>

              <Divider />

              <Box sx={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {group.favorites.map(favorite => (
                  <Box key={favorite.id} sx={{ display: "flex", alignItems: "center" }}>
                    <Box sx={{ width: "100px" }}>
                      <Chip label={favorite.symbol?.ticker} />
                    </Box>

                    <Typography
                      component={Link}
                      to={`/charts/${favorite.id}`}
                      sx={{ color: "text.primary", textDecoration: "none", "&:hover": { textDecoration: "underline" } }}
                    >
                      {favorite.symbol?.name}
                    </Typography>

                    <Box sx={{ minWidth: "60px", flex: 1, textAlign: "right" }}>
                      <CloseIcon
                        sx={{ cursor: "pointer" }}
                        data-favorite-id={favorite.id}
                        onClick={handleDeleteFavorite}
                      />
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </Card>
        ))}
      </Box>
    </Box>
  );
};
