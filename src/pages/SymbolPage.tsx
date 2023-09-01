import { ChangeEvent, FormEvent, MouseEventHandler } from "react";
import { HStack, Icon, IconButton, VStack } from "@chakra-ui/react";
import { DownloadCloud } from "react-feather";
import { SearchInput, SymbolList } from "../components";
import { useFavoriteStore, useSymbolStore } from "../stores";

export const SymbolPage = () => {
  const { favoriteMap, toggleFavorite, getFavoriteMap } = useFavoriteStore(state => ({
    favoriteMap: state.favoriteMap,
    toggleFavorite: state.toggleFavorite,
    getFavoriteMap: state.getFavoriteMap,
  }));
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

  const handleChangeColumn = (e: ChangeEvent<HTMLSelectElement>) => {
    changeColumn(e.target.value);
  };

  const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    changeSearch(e.target.value);
  };

  const handleSearchSearch = async (e: FormEvent<HTMLDivElement>) => {
    e.preventDefault();

    await getSymbolData();
  };

  const handleClickFavorite: MouseEventHandler<HTMLButtonElement> = async e => {
    const symbolId = e.currentTarget.dataset["symbolId"];

    if (!symbolId) return;

    await toggleFavorite(symbolId);
    await getFavoriteMap();
  };

  return (
    <VStack align="stretch" gap="24px" w="full" h="full">
      <HStack justify="space-between">
        <SearchInput
          column={column}
          search={search}
          onChangeColumn={handleChangeColumn}
          onChangeSearch={handleChangeSearch}
          onSubmit={handleSearchSearch}
        />

        <IconButton aria-label="sync database" icon={<Icon as={DownloadCloud} />} onClick={syncSymbolData} />
      </HStack>

      <SymbolList symbolList={symbolList} favoriteMap={favoriteMap} onClickFavorite={handleClickFavorite} />
    </VStack>
  );
};
