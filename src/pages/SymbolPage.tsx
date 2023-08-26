import { ChangeEvent, KeyboardEventHandler, MouseEventHandler } from "react";
import { Box, Button, IconButton, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloudSyncIcon from "@mui/icons-material/CloudSync";
import { useFavoriteStore, useSymbolStore } from "../stores";
import { SymbolList } from "../components";

export const SymbolPage = () => {
  const toggleFavorite = useFavoriteStore(state => state.toggleFavorite);
  const { search, symbolList, changeSearch, getSymbolData, syncSymbolData } = useSymbolStore(state => ({
    search: state.search,
    symbolList: state.symbolList,
    changeSearch: state.changeSearch,
    getSymbolData: state.getSymbolData,
    syncSymbolData: state.syncSymbolData,
  }));

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    changeSearch(e.target.value);
  };

  const handleEnter: KeyboardEventHandler<HTMLInputElement> = async e => {
    if (e.key !== "Enter") return;

    await getSymbolData();
  };

  const handleClickFavorite: MouseEventHandler<SVGSVGElement> = async e => {
    const symbolId = e.currentTarget.dataset["symbolId"];
    const symbol = symbolList?.find(symbol => `${symbol.id}` === symbolId);

    if (!symbol) return;

    await toggleFavorite(symbol);
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

        <Button variant="contained" onClick={syncSymbolData}>
          <CloudSyncIcon />
        </Button>
      </Box>

      <SymbolList symbolList={symbolList} onClickFavorite={handleClickFavorite} />
    </Box>
  );
};
