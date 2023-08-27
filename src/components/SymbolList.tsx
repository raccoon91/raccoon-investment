import { FC, MouseEventHandler, memo, useMemo } from "react";
import { Link } from "react-router-dom";
import { Box, Card, Chip, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import CloseIcon from "@mui/icons-material/Close";

interface ISymbolListProps {
  symbolList: ISymbolData[] | null;
  favoriteList?: ISymbolData[] | null;
  onClickFavorite?: MouseEventHandler<SVGSVGElement>;
  onDeleteFavorite?: MouseEventHandler<SVGSVGElement>;
}

export const SymbolList: FC<ISymbolListProps> = memo(
  ({ symbolList, favoriteList, onClickFavorite, onDeleteFavorite }) => {
    const favoriteMap = useMemo(
      () =>
        favoriteList?.reduce(
          (acc, cur) => {
            acc[cur.id] = true;

            return acc;
          },
          {} as Record<string, boolean>
        ) ?? {},
      [favoriteList]
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

              {onDeleteFavorite && (
                <CloseIcon
                  sx={{ marginLeft: "auto", cursor: "pointer" }}
                  data-symbol-id={symbol.id}
                  onClick={onDeleteFavorite}
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
  }
);
