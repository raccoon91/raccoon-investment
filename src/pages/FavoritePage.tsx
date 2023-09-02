import { MouseEvent, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { useFavoriteStore } from "../stores";
import { GroupList } from "../components";

export const FavoritePage = () => {
  const { groupList, getGroupData, deleteFavorite } = useFavoriteStore(state => ({
    groupList: state.groupList,
    getGroupData: state.getGroupData,
    deleteFavorite: state.deleteFavorite,
  }));

  useEffect(() => {
    getGroupData();
  }, []);

  const handleDeleteFavorite = async (e: MouseEvent<HTMLDivElement>) => {
    const favoriteId = e.currentTarget.dataset["favoriteId"];

    if (!favoriteId) return;

    await deleteFavorite(favoriteId);
    await getGroupData();
  };

  return (
    <Box overflow="auto" w="full" h="full">
      <GroupList groupList={groupList} onDeleteFavorite={handleDeleteFavorite} />
    </Box>
  );
};
