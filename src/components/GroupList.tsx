import { Link } from "react-router-dom";
import { Box, Card, CardBody, CardHeader, Center, Flex, Heading, Icon, Tag, Text, Wrap } from "@chakra-ui/react";
import { X } from "react-feather";
import { FC, MouseEvent } from "react";

interface IGroupListProps {
  groupList: IGroupData[];
  onDeleteFavorite?: (e: MouseEvent<HTMLDivElement>) => Promise<void>;
}

export const GroupList: FC<IGroupListProps> = ({ groupList, onDeleteFavorite }) => {
  return (
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

                  {onDeleteFavorite && (
                    <Center ml="auto" cursor="pointer" data-favorite-id={favorite.id} onClick={onDeleteFavorite}>
                      <Icon as={X} boxSize="24px" />
                    </Center>
                  )}
                </Flex>
              ))}
            </Flex>
          </CardBody>
        </Card>
      ))}
    </Wrap>
  );
};
