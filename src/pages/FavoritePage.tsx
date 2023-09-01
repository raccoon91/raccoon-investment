import { MouseEventHandler, useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, Card, CardBody, CardHeader, HStack, Heading, Icon, IconButton, Tag, Text, Wrap } from "@chakra-ui/react";
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

  const handleDeleteFavorite: MouseEventHandler<HTMLButtonElement> = async e => {
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
              {group.favorites.map(favorite => (
                <HStack key={favorite.id} gap="32px">
                  <Box minW="100px">
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

                  <IconButton
                    variant="none"
                    w="24px"
                    h="24px"
                    color="text"
                    aria-label="favorit"
                    icon={<Icon as={X} />}
                    data-favorite-id={favorite.id}
                    onClick={handleDeleteFavorite}
                  />
                </HStack>
              ))}
            </CardBody>
          </Card>
        ))}
      </Wrap>
    </Box>
  );
};
