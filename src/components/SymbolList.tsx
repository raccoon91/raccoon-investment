import { FC, MouseEventHandler, memo } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardHeader, HStack, Icon, IconButton, Tag, Text, Wrap } from "@chakra-ui/react";
import { Star } from "react-feather";

// import { StarIcon } from "@chakra-ui/icons";

interface ISymbolListProps {
  symbolList: Supabase["public"]["Tables"]["symbols"]["Row"][] | null;
  favoriteMap: Record<number, any>;
  onClickFavorite?: MouseEventHandler<HTMLButtonElement>;
}

export const SymbolList: FC<ISymbolListProps> = memo(({ symbolList, favoriteMap, onClickFavorite }) => {
  return (
    <Wrap overflow="auto" flex="1" spacing="16px">
      {symbolList?.map(symbol => (
        <Card key={symbol.id}>
          <CardHeader pb="0">
            <HStack gap="32px">
              <Tag borderRadius="full">{symbol.ticker}</Tag>

              <HStack spacing="8px">
                <Tag>{symbol.exchange}</Tag>
                <Tag>{symbol.mic_code}</Tag>
                <Tag>{symbol.currency}</Tag>
              </HStack>

              {onClickFavorite && (
                <IconButton
                  variant="ghost"
                  aria-label="favorite"
                  ml="auto"
                  color={favoriteMap[symbol.id] ? "yellow" : "gray"}
                  data-symbol-id={symbol.id}
                  icon={<Icon as={Star} />}
                  onClick={onClickFavorite}
                />
              )}
            </HStack>
          </CardHeader>

          <CardBody>
            <Text as={Link} to={`/charts/${symbol.id}`} _hover={{ textDecoration: "underline" }}>
              {symbol.name}
            </Text>
          </CardBody>
        </Card>
      ))}
    </Wrap>
  );
});
