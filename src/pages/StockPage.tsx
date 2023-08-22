import { ChangeEvent, KeyboardEventHandler } from "react";
import { Box, Button, IconButton, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloudSyncIcon from "@mui/icons-material/CloudSync";
import { SymbolList } from "../components";
import { useStockStore } from "../stores";

export const StockPage = () => {
  const { search, stockList, changeSearch, getStockData, pollingStockData } = useStockStore(state => ({
    search: state.search,
    stockList: state.stockList,
    changeSearch: state.changeSearch,
    getStockData: state.getStockData,
    pollingStockData: state.pollingStockData,
  }));

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    changeSearch(e.target.value);
  };

  const handleEnter: KeyboardEventHandler<HTMLInputElement> = async e => {
    if (e.key !== "Enter") return;

    await getStockData();
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

        <Button variant="contained" onClick={pollingStockData}>
          <CloudSyncIcon />
        </Button>
      </Box>

      <SymbolList symbolList={stockList} />
    </Box>
  );
};
