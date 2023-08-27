import { ChangeEvent, FormEvent, MouseEventHandler } from "react";
import { Box, Button, SelectChangeEvent } from "@mui/material";
import CloudSyncIcon from "@mui/icons-material/CloudSync";
import { SearchInput, SymbolList } from "../components";
import { useFavoriteStore, useSymbolStore } from "../stores";

export const SymbolPage = () => {
  const toggleFavorite = useFavoriteStore(state => state.toggleFavorite);
  const { column, search, symbolList, changeColumn, changeSearch, getSymbolData, syncSymbolData } = useSymbolStore(
    state => ({
      column: state.column,
      search: state.search,
      symbolList: state.symbolList,
      changeColumn: state.changeColumn,
      changeSearch: state.changeSearch,
      getSymbolData: state.getSymbolData,
      syncSymbolData: state.syncSymbolData,
    })
  );

  const handleChangeColumn = (e: SelectChangeEvent<string>) => {
    changeColumn(e.target.value);
  };

  const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    changeSearch(e.target.value);
  };

  const handleSearchSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
        <SearchInput
          column={column}
          search={search}
          onChangeColumn={handleChangeColumn}
          onChangeSearch={handleChangeSearch}
          onSubmit={handleSearchSearch}
        />

        <Button variant="contained" onClick={syncSymbolData}>
          <CloudSyncIcon />
        </Button>
      </Box>

      <SymbolList symbolList={symbolList} onClickFavorite={handleClickFavorite} />
    </Box>
  );
};
