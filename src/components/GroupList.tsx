import { DragEvent, FC, Fragment, MouseEvent, useState } from "react";
import { Link } from "react-router-dom";
import { cloneDeep } from "lodash-es";
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Center,
  Flex,
  HStack,
  Heading,
  Icon,
  Tag,
  Text,
  Wrap,
  useColorModeValue,
} from "@chakra-ui/react";
import { ArrowDownCircle, Menu, X } from "react-feather";

interface IGroupListProps {
  groupList: IGroupData[] | null;
  onChageGroupList: (
    callbackOrValue: IGroupData[] | ((groupList: IGroupData[] | null) => IGroupData[] | null | undefined)
  ) => void;
  onDeleteFavorite?: (e: MouseEvent<HTMLDivElement>) => Promise<void>;
}

export const GroupList: FC<IGroupListProps> = ({ groupList = [], onChageGroupList, onDeleteFavorite }) => {
  const dropzone = useColorModeValue("teal.500", "teal.300");
  const [groupDragItemId, setGroupDragItemId] = useState<number | null>(null);
  const [groupDropzoneIndex, setGroupDropzoneIndex] = useState<number | null>(null);
  const [favoriteDragGroupId, setFavoriteDragGroupId] = useState<number | null>(null);
  const [favoriteDragItemId, setFavoriteDragItemId] = useState<number | null>(null);
  const [favoriteDropzoneGroup, setFavoriteDropzoneGroup] = useState<number | null>(null);
  const [favoriteDropzoneIndex, setFavoriteDropzoneIndex] = useState<number | null>(null);

  const handleDragStartGroup = (e: DragEvent<HTMLDivElement>) => {
    const groupId = e.currentTarget.dataset["groupId"];

    if (!groupId) return;

    setGroupDragItemId(Number(groupId));
  };

  const handleDragEndGroup = () => {
    setGroupDragItemId(null);
    setGroupDropzoneIndex(null);
  };

  const handleDragEnterGroupDropzone = (e: DragEvent<HTMLDivElement>) => {
    const groupDropzoneIndex = e.currentTarget.dataset["dropzoneIndex"];

    if (!groupDropzoneIndex) return;

    setGroupDropzoneIndex(Number(groupDropzoneIndex));
  };

  const handleDragLeaveGroupDropzone = () => {
    setGroupDropzoneIndex(null);
  };

  const handleDropGroupDropzone = (e: DragEvent<HTMLDivElement>) => {
    const groupDropzoneIndex = e.currentTarget.dataset["dropzoneIndex"];

    if (groupDragItemId === null || !groupDropzoneIndex) return;

    const copyGroupList = cloneDeep(groupList ?? []);
    const dragItem = copyGroupList.find(group => group.id === groupDragItemId);
    const dragItemIndex = copyGroupList.findIndex(group => group.id === groupDragItemId);

    if (!dragItem) return;

    if (dragItemIndex === Number(groupDropzoneIndex) || dragItemIndex + 1 === Number(groupDropzoneIndex)) return;

    const calib = dragItemIndex > Number(groupDropzoneIndex) ? 0 : -1;
    const filterGroupList = copyGroupList.filter(group => group.id !== groupDragItemId);
    filterGroupList.splice(Number(groupDropzoneIndex) + calib, 0, dragItem);

    onChageGroupList(
      filterGroupList.map((group, index) => ({
        ...group,
        order: index,
      }))
    );

    setGroupDragItemId(null);
    setGroupDropzoneIndex(null);
  };

  const handleDragStartFavorite = (e: DragEvent<HTMLDivElement>) => {
    const groupId = e.currentTarget.dataset["groupId"];
    const favoriteId = e.currentTarget.dataset["favoriteId"];

    if (!groupId || !favoriteId) return;

    setFavoriteDragGroupId(Number(groupId));
    setFavoriteDragItemId(Number(favoriteId));
  };

  const handleDragEndFavorite = () => {
    setFavoriteDragGroupId(null);
    setFavoriteDragItemId(null);
    setFavoriteDropzoneIndex(null);
    setFavoriteDropzoneGroup(null);
  };

  const handleDragEnterFavoriteDropzone = (e: DragEvent<HTMLDivElement>) => {
    const favoriteDropzoneGroup = e.currentTarget.dataset["groupId"];
    const favoriteDropzoneIndex = e.currentTarget.dataset["dropzoneIndex"];

    if (!favoriteDropzoneGroup || !favoriteDropzoneIndex) return;

    setFavoriteDropzoneGroup(Number(favoriteDropzoneGroup));
    setFavoriteDropzoneIndex(Number(favoriteDropzoneIndex));
  };

  const handleDragLeaveFavoriteDropzone = () => {
    setFavoriteDropzoneIndex(null);
    setFavoriteDropzoneGroup(null);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDropFavoriteDropzone = (e: DragEvent<HTMLDivElement>) => {
    const groupId = e.currentTarget.dataset["groupId"];
    const favoriteDropzoneIndex = e.currentTarget.dataset["dropzoneIndex"];

    if (favoriteDragGroupId === null || favoriteDragItemId === null || !groupId || !favoriteDropzoneIndex) return;

    const copyFavoriteList = cloneDeep(groupList?.find(group => group.id === favoriteDragGroupId)?.favorites ?? []);
    const dragItem = copyFavoriteList.find(favorite => favorite.id === favoriteDragItemId);
    const dragItemIndex = copyFavoriteList.findIndex(favorite => favorite.id === favoriteDragItemId);

    if (!dragItem) return;

    if (
      favoriteDragGroupId === Number(groupId) &&
      (dragItemIndex === Number(favoriteDropzoneIndex) || dragItemIndex + 1 === Number(favoriteDropzoneIndex))
    )
      return;

    if (favoriteDragGroupId === Number(groupId)) {
      const calib = dragItemIndex > Number(favoriteDropzoneIndex) ? 0 : -1;
      const filterFavoriteList = copyFavoriteList.filter(favorite => favorite.id !== favoriteDragItemId);
      filterFavoriteList.splice(Number(favoriteDropzoneIndex) + calib, 0, dragItem);

      onChageGroupList(
        prev =>
          prev?.map(group => {
            if (group.id === Number(groupId)) {
              group.favorites = filterFavoriteList.map((favorite, index) => ({
                ...favorite,
                order: index,
              }));
            }

            return group;
          })
      );
    } else {
      const targetFavoriteList = cloneDeep(groupList?.find(group => group.id === Number(groupId))?.favorites ?? []);
      targetFavoriteList.splice(Number(favoriteDropzoneIndex), 0, dragItem);

      const filterFavoriteList = copyFavoriteList.filter(favorite => favorite.id !== favoriteDragItemId);

      onChageGroupList(
        prev =>
          prev?.map(group => {
            if (group.id === Number(groupId)) {
              group.favorites = targetFavoriteList.map((favorite, index) => ({
                ...favorite,
                order: index,
                group_id: Number(groupId),
              }));
            } else if (group.id === favoriteDragGroupId) {
              group.favorites = filterFavoriteList.map((favorite, index) => ({
                ...favorite,
                order: index,
                group_id: favoriteDragGroupId,
              }));
            }

            return group;
          })
      );
    }

    setFavoriteDragGroupId(null);
    setFavoriteDragItemId(null);
    setFavoriteDropzoneIndex(null);
    setFavoriteDropzoneGroup(null);
  };

  const handleDropFavoriteNewzone = (e: DragEvent<HTMLDivElement>) => {
    const groupId = e.currentTarget.dataset["groupId"];

    if (favoriteDragGroupId === null || favoriteDragItemId === null || !groupId) return;

    const copyFavoriteList = cloneDeep(groupList?.find(group => group.id === favoriteDragGroupId)?.favorites ?? []);
    const dragItem = copyFavoriteList.find(favorite => favorite.id === favoriteDragItemId);

    if (!dragItem) return;

    const filterFavoriteList = copyFavoriteList.filter(favorite => favorite.id !== favoriteDragItemId);

    onChageGroupList(
      prev =>
        prev?.map(group => {
          if (group.id === Number(groupId)) {
            group.favorites = [
              {
                ...dragItem,
                order: 0,
                group_id: Number(groupId),
              },
            ];
          } else if (group.id === favoriteDragGroupId) {
            group.favorites = filterFavoriteList.map((favorite, index) => ({
              ...favorite,
              order: index,
              group_id: favoriteDragGroupId,
            }));
          }

          return group;
        })
    );
    setFavoriteDragGroupId(null);
    setFavoriteDragItemId(null);
    setFavoriteDropzoneIndex(null);
    setFavoriteDropzoneGroup(null);
  };

  return (
    <Wrap overflow="auto" flex="1">
      <>
        <Box
          position="relative"
          w="20px"
          _after={{
            content: '""',
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "2px",
            height: "90%",
            borderRadius: "2px",
            backgroundColor: groupDropzoneIndex === 0 ? dropzone : "transparent",
            transform: "translate(-50%, -50%)",
            transition: "background-color 0.3s linear",
          }}
          data-dropzone-index="0"
          onDragEnter={handleDragEnterGroupDropzone}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeaveGroupDropzone}
          onDrop={handleDropGroupDropzone}
        />

        {groupList?.map((group, gIndex) => (
          <Fragment key={group.id}>
            <Card
              minW="420px"
              draggable
              data-group-id={group.id}
              onDragStart={handleDragStartGroup}
              onDragOver={handleDragOver}
              onDragEnd={handleDragEndGroup}
            >
              <CardHeader as={Flex} align="center" justify="space-between" userSelect="none">
                <Heading as="h3" fontSize="20px">
                  {group.name}
                </Heading>

                <Center cursor="pointer">
                  <Icon as={Menu} boxSize="24px" />
                </Center>
              </CardHeader>

              <CardBody as={Flex} display="flex" py="0" direction="column">
                {group?.favorites?.length ? (
                  <>
                    <Box
                      position="relative"
                      h="20px"
                      _after={{
                        content: '""',
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        width: "90%",
                        height: "2px",
                        borderRadius: "2px",
                        backgroundColor:
                          favoriteDropzoneGroup === group.id && favoriteDropzoneIndex === 0 ? dropzone : "transparent",
                        transform: "translate(-50%, -50%)",
                        transition: "background-color 0.3s linear",
                      }}
                      data-dropzone-index="0"
                      data-group-id={group.id}
                      onDragEnter={handleDragEnterFavoriteDropzone}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeaveFavoriteDropzone}
                      onDrop={handleDropFavoriteDropzone}
                    />

                    {group.favorites.map((favorite, fIndex) => (
                      <Fragment key={favorite.id}>
                        <Flex
                          justify="flex-start"
                          align="flex-start"
                          gap="24px"
                          draggable
                          userSelect="none"
                          opacity={favorite.id === favoriteDragItemId ? 0.3 : 1}
                          data-group-id={group.id}
                          data-favorite-id={favorite.id}
                          onDragStart={handleDragStartFavorite}
                          onDragOver={handleDragOver}
                          onDragEnd={handleDragEndFavorite}
                        >
                          <Center cursor="pointer">
                            <Icon as={Menu} boxSize="24px" />
                          </Center>

                          <HStack w="280px" justify="space-between" align="flex-start">
                            <Tag>{favorite.symbols?.ticker}</Tag>

                            <Text
                              as={Link}
                              w="200px"
                              textDecoration="none"
                              _hover={{ textDecoration: "underline" }}
                              to={`/charts?symboldId=${favorite.symbols?.id}`}
                            >
                              {favorite.symbols?.name}
                            </Text>
                          </HStack>

                          {onDeleteFavorite && (
                            <Center
                              ml="auto"
                              cursor="pointer"
                              data-favorite-id={favorite.id}
                              onClick={onDeleteFavorite}
                            >
                              <Icon as={X} boxSize="24px" />
                            </Center>
                          )}
                        </Flex>

                        <Box
                          position="relative"
                          h="20px"
                          _after={{
                            content: '""',
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            width: "90%",
                            height: "2px",
                            borderRadius: "2px",
                            backgroundColor:
                              favoriteDropzoneGroup === group.id && favoriteDropzoneIndex === fIndex + 1
                                ? dropzone
                                : "transparent",
                            transform: "translate(-50%, -50%)",
                            transition: "background-color 0.3s linear",
                          }}
                          data-dropzone-index={fIndex + 1}
                          data-group-id={group.id}
                          onDragEnter={handleDragEnterFavoriteDropzone}
                          onDragOver={handleDragOver}
                          onDragLeave={handleDragLeaveFavoriteDropzone}
                          onDrop={handleDropFavoriteDropzone}
                        />
                      </Fragment>
                    ))}
                  </>
                ) : (
                  <Center
                    py="16px"
                    my="20px"
                    border="2px dashed"
                    borderColor="border"
                    borderRadius="4px"
                    data-group-id={group.id}
                    onDragOver={handleDragOver}
                    onDrop={handleDropFavoriteNewzone}
                  >
                    <Icon as={ArrowDownCircle} boxSize="24px" />
                  </Center>
                )}
              </CardBody>
            </Card>

            <Box
              position="relative"
              w="20px"
              _after={{
                content: '""',
                position: "absolute",
                top: "50%",
                left: "50%",
                width: "2px",
                height: "90%",
                borderRadius: "2px",
                backgroundColor: groupDropzoneIndex === gIndex + 1 ? dropzone : "transparent",
                transform: "translate(-50%, -50%)",
                transition: "background-color 0.3s linear",
              }}
              data-dropzone-index={gIndex + 1}
              onDragEnter={handleDragEnterGroupDropzone}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeaveGroupDropzone}
              onDrop={handleDropGroupDropzone}
            />
          </Fragment>
        ))}
      </>
    </Wrap>
  );
};
