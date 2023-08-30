import { FC, MouseEventHandler, memo } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardHeader, HStack, Tag, Text, Wrap } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

interface ISymbolListProps {
  symbolList: Supabase["public"]["Tables"]["symbols"]["Row"][] | null;
  favoriteMap: Record<number, any>;
  onClickFavorite?: MouseEventHandler<SVGSVGElement>;
}

export const SymbolList: FC<ISymbolListProps> = memo(({ symbolList, favoriteMap, onClickFavorite }) => {
  return (
    <Wrap overflow="auto" flex="1" gap="16px">
      {symbolList?.map(symbol => (
        <Card key={symbol.id}>
          <CardHeader>
            <HStack gap="16px">
              <Tag borderRadius="full">{symbol.ticker}</Tag>

              <HStack spacing="8px">
                <Tag>{symbol.exchange}</Tag>
                <Tag>{symbol.mic_code}</Tag>
                <Tag>{symbol.currency}</Tag>
              </HStack>

              {onClickFavorite && (
                <StarIcon
                  ml="auto"
                  cursor="pointer"
                  color={favoriteMap[symbol.id] ? "yellow" : "gray"}
                  data-symbol-id={symbol.id}
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
