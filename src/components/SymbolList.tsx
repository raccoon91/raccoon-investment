import { FC, MouseEventHandler, memo, useMemo } from "react";
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
      favorites.reduce(
        (acc, cur) => {
          acc[cur.symbol] = true;

          return acc;
        },
        {} as Record<string, boolean>
      ),
    [favorites]
  );

  return (
    <Box
      sx={{
        overflow: "auto",
        display: "flex",
        flexWrap: "wrap",
        alignContent: "baseline",
        gap: "16px",
        flex: 1,
      }}
    >
      {symbolList?.map(symbolData => (
        <Card key={symbolData.symbol} sx={{ display: "flex", flexDirection: "column", gap: "24px", padding: "16px" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: "60px" }}>
            <Chip label={symbolData.symbol} />

            <Box sx={{ display: "flex", gap: "8px" }}>
              <Chip variant="outlined" label={symbolData.exchange} />
              <Chip variant="outlined" label={symbolData.mic_code} />
              <Chip variant="outlined" label={symbolData.currency} />
            </Box>

            {onClickFavorite && (
              <StarIcon
                sx={{
                  marginLeft: "auto",
                  cursor: "pointer",
                  color: favoriteMap[symbolData.symbol] ? "yellow" : "gray",
                }}
                data-symbol={symbolData.symbol}
                onClick={onClickFavorite}
              />
            )}
          </Box>

          <Typography sx={{ padding: "0 4px" }}>{symbolData.name}</Typography>
        </Card>
      ))}
    </Box>
  );
});
