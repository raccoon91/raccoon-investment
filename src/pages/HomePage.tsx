import { useEffect } from "react";
import { Icon, IconButton } from "@chakra-ui/react";
import { Save } from "react-feather";
import { ContentsLayout } from "../layouts";
import { GroupList } from "../components";
import { useFavoriteStore } from "../stores";

export const HomePage = () => {
  const { copyGroupList, getGroupList, setCopyGroupList, saveGroupListOrder } = useFavoriteStore(state => ({
    copyGroupList: state.copyGroupList,
    getGroupList: state.getGroupList,
    setCopyGroupList: state.setCopyGroupList,
    saveGroupListOrder: state.saveGroupListOrder,
  }));

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

  return (
    <ContentsLayout
      right={<IconButton aria-label="sync database" icon={<Icon as={Save} />} onClick={handleSaveGroupList} />}
    >
      <GroupList groupList={copyGroupList} onChageGroupList={handleChangeFavoriteList} />
    </ContentsLayout>
  );
};
