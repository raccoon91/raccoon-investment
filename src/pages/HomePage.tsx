import { useEffect } from "react";
import { Box, Card, CardBody, CardHeader, Flex, Heading, Tag, Text, Wrap } from "@chakra-ui/react";
import { useFavoriteStore } from "../stores";

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
                <Flex key={favorite.id}>
                  <Box w="100px">
                    <Tag>{favorite.symbols?.ticker}</Tag>
                  </Box>
                  <Text>{favorite.symbols?.name}</Text>
                </Flex>
              ))}
            </CardBody>
          </Card>
        ))}
      </Wrap>
    </Box>
  );
};
