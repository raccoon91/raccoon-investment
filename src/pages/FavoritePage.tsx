import { MouseEvent, useEffect } from "react";
import { HStack, Icon, IconButton, VStack } from "@chakra-ui/react";
import { Save } from "react-feather";
import { GroupList } from "../components";
import { useFavoriteStore } from "../stores";

export const FavoritePage = () => {
  const { copyGroupList, getGroupList, deleteFavorite, setCopyGroupList, saveGroupListOrder } = useFavoriteStore(
    state => ({
      copyGroupList: state.copyGroupList,
      getGroupList: state.getGroupList,
      deleteFavorite: state.deleteFavorite,
      setCopyGroupList: state.setCopyGroupList,
      saveGroupListOrder: state.saveGroupListOrder,
    })
  );

  useEffect(() => {
    getGroupList();
  }, []);

  const handleChangeFavoriteList = (
    callbackOrValue: IGroupData[] | ((groupList: IGroupData[] | null) => IGroupData[] | null | undefined)
  ) => {
    if (typeof callbackOrValue === "function") {
      setCopyGroupList(callbackOrValue(copyGroupList) ?? null);
    } else {
      setCopyGroupList(callbackOrValue);
    }
  };

  const handleSaveGroupList = async () => {
    await saveGroupListOrder();
  };
  const handleDeleteFavorite = async (e: MouseEvent<HTMLDivElement>) => {
    const favoriteId = e.currentTarget.dataset["favoriteId"];

    if (!favoriteId) return;

    await deleteFavorite(favoriteId);
    await getGroupList();
  };

  return (
    <VStack align="stretch" gap="24px" w="full" h="full">
      <HStack justify="flex-end">
        <IconButton aria-label="sync database" icon={<Icon as={Save} />} onClick={handleSaveGroupList} />
      </HStack>

      <GroupList
        groupList={copyGroupList}
        onChageGroupList={handleChangeFavoriteList}
        onDeleteFavorite={handleDeleteFavorite}
      />
    </VStack>
  );
};
