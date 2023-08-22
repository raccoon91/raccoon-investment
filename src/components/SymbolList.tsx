import { FC, memo } from "react";
import { Box, Card, CardContent, Chip, Typography } from "@mui/material";

interface ISymbolListProps {
  symbolList: ISymbolData[] | null;
}

export const SymbolList: FC<ISymbolListProps> = memo(({ symbolList }) => {
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
      {symbolList?.map(stock => (
        <Card key={stock.symbol}>
          <CardContent>
            <Box sx={{ display: "flex", gap: "60px" }}>
              <Chip label={stock.symbol} />

              <Box sx={{ display: "flex", gap: "8px" }}>
                <Chip variant="outlined" label={stock.exchange} />
                <Chip variant="outlined" label={stock.mic_code} />
                <Chip variant="outlined" label={stock.currency} />
              </Box>
            </Box>

            <Typography sx={{ marginTop: "24px", padding: "0 4px" }}>{stock.name}</Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
});
