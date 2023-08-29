import { FC, MouseEventHandler, memo } from "react";
import { Link } from "react-router-dom";
import { Box, Card, Chip, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

interface ISymbolListProps {
  symbolList: Supabase["public"]["Tables"]["symbols"]["Row"][] | null;
  favoriteMap: Record<number, any>;
  onClickFavorite?: MouseEventHandler<SVGSVGElement>;
}

export const SymbolList: FC<ISymbolListProps> = memo(({ symbolList, favoriteMap, onClickFavorite }) => {
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
                sx={{ marginLeft: "auto", cursor: "pointer", color: favoriteMap[symbol.id] ? "yellow" : "gray" }}
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
