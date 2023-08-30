import { useEffect } from "react";
import { Box, Card, Chip, Divider, Typography } from "@mui/material";
import { useFavoriteStore } from "../stores";

export const HomePage = () => {
  const { groupList, getGroupData } = useFavoriteStore(state => ({
    groupList: state.groupList,
    getGroupData: state.getGroupData,
  }));

  useEffect(() => {
    getGroupData();
  }, []);

  return (
    <Box sx={{ overflow: "auto", width: "100%", height: "100%" }}>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
        {groupList.map(group => (
          <Card key={group.name}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "16px", padding: "16px" }}>
              <Typography>{group.name}</Typography>

              <Divider />

              <Box sx={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {group.favorites.map(favorite => (
                  <Box key={favorite.id} sx={{ display: "flex", alignItems: "center" }}>
                    <Box sx={{ width: "100px" }}>
                      <Chip label={favorite.symbols?.ticker} />
                    </Box>
                    <Typography>{favorite.symbols?.name}</Typography>
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
