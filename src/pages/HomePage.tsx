import { useEffect } from "react";
import { HStack, Icon, IconButton, VStack } from "@chakra-ui/react";
import { Save } from "react-feather";
import { GroupList } from "../components";
import { useFavoriteStore } from "../stores";

export const HomePage = () => {
  const { copyGroupList, getGroupData, setCopyGroupList, saveGroupListOrder } = useFavoriteStore(state => ({
    copyGroupList: state.copyGroupList,
    getGroupData: state.getGroupData,
    setCopyGroupList: state.setCopyGroupList,
    saveGroupListOrder: state.saveGroupListOrder,
  }));

  useEffect(() => {
    getGroupData();
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

  return (
    <VStack align="stretch" gap="24px" w="full" h="full">
      <HStack justify="flex-end">
        <IconButton aria-label="sync database" icon={<Icon as={Save} />} onClick={handleSaveGroupList} />
      </HStack>

      <GroupList groupList={copyGroupList} onChageGroupList={handleChangeFavoriteList} />
    </VStack>
  );
};
