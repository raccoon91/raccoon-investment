import { FC, MouseEventHandler, memo, useMemo } from "react";
import { Link } from "react-router-dom";
import { Box, Card, Chip, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { useFavoriteStore } from "../stores";

interface ISymbolListProps {
  symbolList: ISymbolData[] | null;
  onClickFavorite?: MouseEventHandler<SVGSVGElement>;
}

export const SymbolList: FC<ISymbolListProps> = memo(({ symbolList, onClickFavorite }) => {
  const favorites = useFavoriteStore(state => state.favorites);

  const favoriteMap = useMemo(
    () =>
      favorites?.reduce(
        (acc, cur) => {
          acc[cur.id] = true;

          return acc;
        },
        {} as Record<string, boolean>
      ) ?? {},
    [favorites]
  );

  return (
    <Box sx={{ overflow: "auto", display: "flex", flexWrap: "wrap", alignContent: "baseline", gap: "16px", flex: 1 }}>
      {symbolList?.map(symbol => (
        <Card key={symbol.id} sx={{ display: "flex", flexDirection: "column", gap: "24px", padding: "16px" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: "60px" }}>
            <Chip label={symbol.ticker} />

            <Box sx={{ display: "flex", gap: "8px" }}>
              <Chip variant="outlined" label={symbol.exchange} />
              <Chip variant="outlined" label={symbol.mic_code} />
              <Chip variant="outlined" label={symbol.currency} />
            </Box>

            {onClickFavorite && (
              <StarIcon
                sx={{
                  marginLeft: "auto",
                  cursor: "pointer",
                  color: favoriteMap[symbol.id] ? "yellow" : "gray",
                }}
                data-symbol-id={symbol.id}
                onClick={onClickFavorite}
              />
            )}
          </Box>

          <Typography
            component={Link}
            to={`/charts/${symbol.id}`}
            sx={{ color: "text.primary", textDecoration: "none", "&:hover": { textDecoration: "underline" } }}
          >
            {symbol.name}
          </Typography>
        </Card>
      ))}
    </Box>
  );
});
