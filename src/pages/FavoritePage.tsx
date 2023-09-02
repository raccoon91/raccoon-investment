import { MouseEvent, useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, Card, CardBody, CardHeader, Center, Flex, Heading, Icon, Tag, Text, Wrap } from "@chakra-ui/react";
import { X } from "react-feather";
import { useFavoriteStore } from "../stores";

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
      <Wrap spacing="16px">
        {groupList.map(group => (
          <Card key={group.name} minW="400px">
            <CardHeader>
              <Heading as="h3" fontSize="20px">
                {group.name}
              </Heading>
            </CardHeader>

            <CardBody>
              <Flex direction="column" gap="24px">
                {group.favorites.map(favorite => (
                  <Flex key={favorite.id} gap="12px">
                    <Box minW="80px">
                      <Tag>{favorite.symbols?.ticker}</Tag>
                    </Box>

                    <Text
                      as={Link}
                      to={`/charts/${favorite.symbols?.id}`}
                      textDecoration="none"
                      _hover={{ textDecoration: "underline" }}
                    >
                      {favorite.symbols?.name}
                    </Text>

                    <Center ml="auto" cursor="pointer" data-favorite-id={favorite.id} onClick={handleDeleteFavorite}>
                      <Icon as={X} boxSize="24px" />
                    </Center>
                  </Flex>
                ))}
              </Flex>
            </CardBody>
          </Card>
        ))}
      </Wrap>
    </Box>
  );
};
