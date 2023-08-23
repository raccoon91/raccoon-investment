import { ChangeEvent, KeyboardEventHandler, MouseEventHandler } from "react";
import { Box, Button, IconButton, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloudSyncIcon from "@mui/icons-material/CloudSync";
import { useFavoriteStore, useStockStore } from "../stores";
import { SymbolList } from "../components";

export const StockPage = () => {
  const toggleFavorite = useFavoriteStore(state => state.toggleFavorite);
  const { search, stockList, changeSearch, getStockData, syncStockData } = useStockStore(state => ({
    search: state.search,
    stockList: state.stockList,
    changeSearch: state.changeSearch,
    getStockData: state.getStockData,
    syncStockData: state.syncStockData,
  }));

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    changeSearch(e.target.value);
  };

  const handleEnter: KeyboardEventHandler<HTMLInputElement> = async e => {
    if (e.key !== "Enter") return;

    await getStockData();
  };

  const handleClickFavorite: MouseEventHandler<SVGSVGElement> = async e => {
    const symbol = e.currentTarget.dataset["symbol"];
    const symbolData = stockList?.find(stock => stock.symbol === symbol);

    if (!symbolData) return;

    await toggleFavorite(symbolData);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "24px", width: "100%", height: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <TextField
          size="small"
          value={search}
          onChange={handleChange}
          onKeyDown={handleEnter}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" color="primary">
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button variant="contained" onClick={syncStockData}>
          <CloudSyncIcon />
        </Button>
      </Box>

      <SymbolList symbolList={stockList} onClickFavorite={handleClickFavorite} />
    </Box>
  );
};
