import { useEffect } from "react";
import { Box, Card, Chip, Divider, Typography } from "@mui/material";
import { useFavoriteStore } from "../stores";

export const HomePage = () => {
  const { favoriteGroupList, getFavoriteData } = useFavoriteStore(state => ({
    favoriteGroupList: state.favoriteGroupList,
    getFavoriteData: state.getFavoriteData,
  }));

  useEffect(() => {
    getFavoriteData();
  }, []);

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
                    <Typography>{favorite.symbol?.name}</Typography>
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
