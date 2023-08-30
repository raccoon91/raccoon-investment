import { MouseEventHandler, useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, Card, CardBody, CardHeader, HStack, Tag, Text, Wrap } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
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

  const handleDeleteFavorite: MouseEventHandler<SVGSVGElement> = async e => {
    const favoriteId = e.currentTarget.dataset["favoriteId"];

    if (!favoriteId) return;

    await deleteFavorite(favoriteId);
    await getGroupData();
  };

  return (
    <Box overflow="auto" w="full" h="full">
      <Wrap gap="16px">
        {groupList.map(group => (
          <Card key={group.name}>
            <CardHeader>
              <Text>{group.name}</Text>
            </CardHeader>

            <CardBody>
              {group.favorites.map(favorite => (
                <HStack key={favorite.id}>
                  <Box w="100px">
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

                  <Box>
                    <StarIcon cursor="pointer" data-favorite-id={favorite.id} onClick={handleDeleteFavorite} />
                  </Box>
                </HStack>
              ))}
            </CardBody>
          </Card>
        ))}
      </Wrap>
    </Box>
  );
};
