import { DragEvent, FC, MouseEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardHeader, Center, Flex, HStack, Heading, Icon, Tag, Text, Wrap } from "@chakra-ui/react";
import { ArrowDownCircle, Menu, X } from "react-feather";

interface IGroupListProps {
  groupList: IGroupData[] | null;
  onChageGroupList: (
    callbackOrValue: IGroupData[] | ((groupList: IGroupData[] | null) => IGroupData[] | null | undefined)
  ) => void;
  onDeleteFavorite?: (e: MouseEvent<HTMLDivElement>) => Promise<void>;
}

export const GroupList: FC<IGroupListProps> = ({ groupList = [], onChageGroupList, onDeleteFavorite }) => {
  const [groupId, setGroupId] = useState<number | null>(null);
  const [favoriteId, setFavoriteId] = useState<number | null>(null);

  const handleDragStartGroup = (e: DragEvent<HTMLDivElement>) => {
    const groupId = e.currentTarget.dataset["groupId"];

    if (!groupId) return;

    setGroupId(Number(groupId));
  };

  const handleDragEndGroup = () => {
    setGroupId(null);
  };

  const handleDragEnterGroup = (e: DragEvent<HTMLDivElement>) => {
    const targetGroupId = e.currentTarget.dataset["groupId"];

    if (!groupList || !targetGroupId || groupId === null || favoriteId !== null || Number(targetGroupId) === groupId)
      return;

    const dragItem = groupList.find(group => group.id === groupId);

    if (!dragItem) return;

    const targetIndex = groupList.findIndex(group => group.id === Number(targetGroupId));
    const dragItemIndex = groupList.findIndex(group => group.id === groupId);

    const temp = groupList[targetIndex];

    groupList[targetIndex] = dragItem;
    groupList[dragItemIndex] = temp;

    onChageGroupList(groupList.map((group, index) => ({ ...group, order: index })));
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDropGroup = () => {
    setGroupId(null);
  };

  const handleDragStartFavorite = (e: DragEvent<HTMLDivElement>) => {
    const groupId = e.currentTarget.dataset["groupId"];
    const favoriteId = e.currentTarget.dataset["favoriteId"];

    if (!groupId || !favoriteId) return;

    setGroupId(Number(groupId));
    setFavoriteId(Number(favoriteId));
  };

  const handleDragEndFavorite = () => {
    setGroupId(null);
    setFavoriteId(null);
  };

  const handleDragEnterFavorite = (e: DragEvent<HTMLDivElement>) => {
    const targetGroupId = e.currentTarget.dataset["groupId"];
    const targetFavoriteId = e.currentTarget.dataset["favoriteId"];

    if (
      !groupList ||
      !targetGroupId ||
      !targetFavoriteId ||
      groupId === null ||
      favoriteId === null ||
      (Number(targetGroupId) === groupId && Number(targetFavoriteId) === favoriteId)
    )
      return;

    if (Number(targetGroupId) === groupId) {
      const targetGroup = groupList.find(group => group.id === Number(targetGroupId));
      const targetGroupIndex = groupList.findIndex(group => group.id === Number(targetGroupId));

      if (!targetGroup || !targetGroup.favorites) return;

      const dragItem = targetGroup.favorites?.find(favorite => favorite.id === favoriteId);

      if (!dragItem) return;

      const targetIndex = targetGroup.favorites?.findIndex(favorite => favorite.id === Number(targetFavoriteId));
      const dragItemIndex = targetGroup.favorites?.findIndex(favorite => favorite.id === favoriteId);

      const temp = targetGroup.favorites[targetIndex];

      targetGroup.favorites[targetIndex] = dragItem;
      targetGroup.favorites[dragItemIndex] = temp;

      groupList[targetGroupIndex] = targetGroup;

      onChageGroupList(
        groupList.map(group => ({
          ...group,
          favorites:
            group.favorites?.map((favorite, index) => ({
              ...favorite,
              order: index,
            })) ?? [],
        }))
      );
    } else {
      const targetGroup = groupList.find(group => group.id === Number(targetGroupId));
      const dragItemGroup = groupList.find(group => group.id === groupId);

      if (!targetGroup || !dragItemGroup || !targetGroup.favorites || !dragItemGroup.favorites) return;

      const dragItem = dragItemGroup.favorites?.find(favorite => favorite.id === favoriteId);

      if (!dragItem) return;

      const targetIndex = targetGroup.favorites?.findIndex(favorite => favorite.id === Number(targetFavoriteId));
      const dragItemIndex = dragItemGroup.favorites?.findIndex(favorite => favorite.id === favoriteId);

      dragItemGroup.favorites.splice(dragItemIndex, 1);
      targetGroup.favorites.splice(targetIndex, 0, dragItem);

      setGroupId(Number(targetGroupId));
      onChageGroupList(
        groupList.map((group, gIndex) => ({
          ...group,
          order: gIndex,
          favorites:
            group.favorites?.map((favorite, fIndex) => ({
              ...favorite,
              order: fIndex,
              group_id: group.id,
            })) ?? [],
        }))
      );
    }
  };

  const handleDropFavorite = () => {
    setGroupId(null);
    setFavoriteId(null);
  };

  return (
    <Wrap overflow="auto" flex="1" spacing="20px">
      {groupList?.map(group => (
        <Card
          key={group.id}
          minW="420px"
          data-testid={`${group.name}-group`}
          data-group-id={group.id}
          bg={group.id === groupId && favoriteId === null ? "border" : "unset"}
          opacity={group.id === groupId && favoriteId === null ? 0.3 : 1}
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnterGroup}
          onDrop={handleDropGroup}
        >
          <CardHeader as={Flex} align="center" justify="space-between" userSelect="none">
            <Heading as="h3" fontSize="20px">
              {group.name}
            </Heading>

            <Center
              cursor="pointer"
              draggable
              data-group-id={group.id}
              onDragStart={handleDragStartGroup}
              onDragEnd={handleDragEndGroup}
            >
              <Icon as={Menu} boxSize="24px" />
            </Center>
          </CardHeader>

          <CardBody as={Flex} display="flex" direction="column" pt="0" gap="10px">
            {group.favorites?.length ? (
              group.favorites?.map(favorite => (
                <Flex
                  key={favorite.id}
                  justify="flex-start"
                  align="flex-start"
                  gap="24px"
                  py="6px"
                  borderRadius="6px"
                  userSelect="none"
                  opacity={group.id === groupId && favorite.id === favoriteId ? 0.3 : 1}
                  bg={group.id === groupId && favorite.id === favoriteId ? "border" : "unset"}
                  data-group-id={group.id}
                  data-favorite-id={favorite.id}
                  onDragOver={handleDragOver}
                  onDragEnter={handleDragEnterFavorite}
                  onDrop={handleDropFavorite}
                >
                  <Center
                    cursor="pointer"
                    draggable
                    data-group-id={group.id}
                    data-favorite-id={favorite.id}
                    onDragStart={handleDragStartFavorite}
                    onDragEnd={handleDragEndFavorite}
                  >
                    <Icon as={Menu} boxSize="24px" />
                  </Center>

                  <HStack w="280px" justify="space-between" align="flex-start">
                    <Tag>{favorite.symbols?.ticker}</Tag>

                    <Text
                      as={Link}
                      w="200px"
                      textDecoration="none"
                      _hover={{ textDecoration: "underline" }}
                      to={`/charts?symbolId=${favorite.symbols?.id}`}
                    >
                      {favorite.symbols?.name}
                    </Text>
                  </HStack>

                  {onDeleteFavorite && (
                    <Center ml="auto" cursor="pointer" data-favorite-id={favorite.id} onClick={onDeleteFavorite}>
                      <Icon as={X} boxSize="24px" />
                    </Center>
                  )}
                </Flex>
              ))
            ) : (
              <Center
                py="16px"
                my="20px"
                border="2px dashed"
                borderColor="border"
                borderRadius="4px"
                data-group-id={group.id}
                data-favorite-id="0"
                onDragOver={handleDragOver}
                onDragEnter={handleDragEnterFavorite}
                onDrop={handleDropFavorite}
              >
                <Icon as={ArrowDownCircle} boxSize="24px" />
              </Center>
            )}
          </CardBody>
        </Card>
      ))}
    </Wrap>
  );
};
