import { ChangeEvent, KeyboardEventHandler } from "react";
import { Box, Button, IconButton, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloudSyncIcon from "@mui/icons-material/CloudSync";
import { SymbolList } from "../components";
import { useETFStore } from "../stores";

export const ETFPage = () => {
  const { search, etfList, changeSearch, getETFData, pollingETFData } = useETFStore(state => ({
    search: state.search,
    etfList: state.etfList,
    changeSearch: state.changeSearch,
    getETFData: state.getETFData,
    pollingETFData: state.pollingETFData,
  }));

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    changeSearch(e.target.value);
  };

  const handleEnter: KeyboardEventHandler<HTMLInputElement> = async e => {
    if (e.key !== "Enter") return;

    await getETFData();
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

        <Button variant="contained" onClick={pollingETFData}>
          <CloudSyncIcon />
        </Button>
      </Box>

      <SymbolList symbolList={etfList} />
    </Box>
  );
};
