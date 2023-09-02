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
  onChageGroupList: (callback: (groupList: IGroupData[] | null) => IGroupData[] | null | undefined) => void;
  onDeleteFavorite?: (e: MouseEvent<HTMLDivElement>) => Promise<void>;
}

export const GroupList: FC<IGroupListProps> = ({ groupList = [], onChageGroupList, onDeleteFavorite }) => {
  const dropzone = useColorModeValue("teal.500", "teal.300");
  const [dragGroupId, setDragGroupId] = useState<number | null>(null);
  const [dragItemId, setDragItemId] = useState<number | null>(null);
  const [dropzoneGroup, setDropzoneGroup] = useState<number | null>(null);
  const [dropzoneIndex, setDropzoneIndex] = useState<number | null>(null);

  const handleDragStartFavorite = (e: DragEvent<HTMLDivElement>) => {
    const groupId = e.currentTarget.dataset["groupId"];
    const favoriteId = e.currentTarget.dataset["favoriteId"];

    if (!groupId || !favoriteId) return;

    setDragGroupId(Number(groupId));
    setDragItemId(Number(favoriteId));
  };

  const handleDragEndFavorite = () => {
    setDragGroupId(null);
    setDragItemId(null);
    setDropzoneIndex(null);
    setDropzoneGroup(null);
  };

  const handleDragEnterDropzone = (e: DragEvent<HTMLDivElement>) => {
    const dropzoneGroup = e.currentTarget.dataset["groupId"];
    const dropzoneIndex = e.currentTarget.dataset["dropzoneIndex"];

    if (!dropzoneGroup || !dropzoneIndex) return;

    setDropzoneGroup(Number(dropzoneGroup));
    setDropzoneIndex(Number(dropzoneIndex));
  };

  const handleDragLeaveDropzone = () => {
    setDropzoneIndex(null);
    setDropzoneGroup(null);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDropDropZone = (e: DragEvent<HTMLDivElement>) => {
    const groupId = e.currentTarget.dataset["groupId"];
    const dropzoneIndex = e.currentTarget.dataset["dropzoneIndex"];

    if (dragGroupId === null || dragItemId === null || !groupId || !dropzoneIndex) return;

    const copyFavoriteList = cloneDeep(groupList?.find(group => group.id === dragGroupId)?.favorites ?? []);
    const dragItem = copyFavoriteList.find(favorite => favorite.id === dragItemId);
    const dragItemIndex = copyFavoriteList.findIndex(favorite => favorite.id === dragItemId);

    if (!dragItem) return;

    if (
      dragGroupId === Number(groupId) &&
      (dragItemIndex === Number(dropzoneIndex) || dragItemIndex + 1 === Number(dropzoneIndex))
    )
      return;

    if (dragGroupId === Number(groupId)) {
      const calib = dragItemIndex > Number(dropzoneIndex) ? 0 : -1;
      const filterFavoriteList = copyFavoriteList.filter(favorite => favorite.id !== dragItemId);
      filterFavoriteList.splice(Number(dropzoneIndex) + calib, 0, dragItem);

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
      targetFavoriteList.splice(Number(dropzoneIndex), 0, dragItem);

      const filterFavoriteList = copyFavoriteList.filter(favorite => favorite.id !== dragItemId);

      onChageGroupList(
        prev =>
          prev?.map(group => {
            if (group.id === Number(groupId)) {
              group.favorites = targetFavoriteList.map((favorite, index) => ({
                ...favorite,
                order: index,
                group_id: Number(groupId),
              }));
            } else if (group.id === dragGroupId) {
              group.favorites = filterFavoriteList.map((favorite, index) => ({
                ...favorite,
                order: index,
                group_id: dragGroupId,
              }));
            }

            return group;
          })
      );
    }

    setDragGroupId(null);
    setDragItemId(null);
    setDropzoneIndex(null);
    setDropzoneGroup(null);
  };

  const handleDropNewzone = (e: DragEvent<HTMLDivElement>) => {
    const groupId = e.currentTarget.dataset["groupId"];

    if (dragGroupId === null || dragItemId === null || !groupId) return;

    const copyFavoriteList = cloneDeep(groupList?.find(group => group.id === dragGroupId)?.favorites ?? []);
    const dragItem = copyFavoriteList.find(favorite => favorite.id === dragItemId);

    if (!dragItem) return;

    const filterFavoriteList = copyFavoriteList.filter(favorite => favorite.id !== dragItemId);

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
          } else if (group.id === dragGroupId) {
            group.favorites = filterFavoriteList.map((favorite, index) => ({
              ...favorite,
              order: index,
              group_id: dragGroupId,
            }));
          }

          return group;
        })
    );
    setDragGroupId(null);
    setDragItemId(null);
    setDropzoneIndex(null);
    setDropzoneGroup(null);
  };

  return (
    <Wrap overflow="auto" flex="1" spacing="16px">
      {groupList?.map(group => (
        <Card key={group.name} minW="420px">
          <CardHeader>
            <Heading as="h3" fontSize="20px">
              {group.name}
            </Heading>
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
                    backgroundColor: dropzoneGroup === group.id && dropzoneIndex === 0 ? dropzone : "transparent",
                    transform: "translate(-50%, -50%)",
                    transition: "background-color 0.3s linear",
                  }}
                  data-dropzone-index="0"
                  data-group-id={group.id}
                  onDragEnter={handleDragEnterDropzone}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeaveDropzone}
                  onDrop={handleDropDropZone}
                />

                {group.favorites.map((favorite, index) => (
                  <Fragment key={favorite.id}>
                    <Flex
                      justify="flex-start"
                      align="flex-start"
                      gap="24px"
                      draggable
                      userSelect="none"
                      opacity={favorite.id === dragItemId ? 0.3 : 1}
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
                          to={`/charts/${favorite.symbols?.id}`}
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
                          dropzoneGroup === group.id && dropzoneIndex === index + 1 ? dropzone : "transparent",
                        transform: "translate(-50%, -50%)",
                        transition: "background-color 0.3s linear",
                      }}
                      data-dropzone-index={index + 1}
                      data-group-id={group.id}
                      onDragEnter={handleDragEnterDropzone}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeaveDropzone}
                      onDrop={handleDropDropZone}
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
                onDrop={handleDropNewzone}
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
