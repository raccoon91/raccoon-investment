import { ChangeEvent, KeyboardEventHandler, MouseEventHandler } from "react";
import { Box, Button, IconButton, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloudSyncIcon from "@mui/icons-material/CloudSync";
import { useETFStore, useFavoriteStore } from "../stores";
import { SymbolList } from "../components";

export const ETFPage = () => {
  const toggleFavorite = useFavoriteStore(state => state.toggleFavorite);
  const { search, etfList, changeSearch, getETFData, syncETFData } = useETFStore(state => ({
    search: state.search,
    etfList: state.etfList,
    changeSearch: state.changeSearch,
    getETFData: state.getETFData,
    syncETFData: state.syncETFData,
  }));

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    changeSearch(e.target.value);
  };

  const handleEnter: KeyboardEventHandler<HTMLInputElement> = async e => {
    if (e.key !== "Enter") return;

    await getETFData();
  };

  const handleClickFavorite: MouseEventHandler<SVGSVGElement> = async e => {
    const symbol = e.currentTarget.dataset["symbol"];
    const symbolData = etfList?.find(etf => etf.symbol === symbol);

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

        <Button variant="contained" onClick={syncETFData}>
          <CloudSyncIcon />
        </Button>
      </Box>

      <SymbolList symbolList={etfList} onClickFavorite={handleClickFavorite} />
    </Box>
  );
};
