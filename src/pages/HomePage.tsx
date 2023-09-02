import { useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { useFavoriteStore } from "../stores";
import { GroupList } from "../components";

export const HomePage = () => {
  const { groupList, getGroupData } = useFavoriteStore(state => ({
    groupList: state.groupList,
    getGroupData: state.getGroupData,
  }));

  useEffect(() => {
    getGroupData();
  }, []);

  return (
    <Box overflow="auto" w="full" h="full">
      <GroupList groupList={groupList} />
    </Box>
  );
};
