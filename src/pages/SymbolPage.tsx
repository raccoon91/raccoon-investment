import { ChangeEvent, FormEvent, MouseEventHandler } from "react";
import { Button, HStack, VStack } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
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

  const handleSearchSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await getSymbolData();
  };

  const handleClickFavorite: MouseEventHandler<SVGSVGElement> = async e => {
    const symbolId = e.currentTarget.dataset["symbolId"];

    if (!symbolId) return;

    await toggleFavorite(symbolId);
    await getFavoriteMap();
  };

  return (
    <VStack gap="24px" w="full" h="full">
      <HStack justify="space-between">
        <SearchInput
          column={column}
          search={search}
          onChangeColumn={handleChangeColumn}
          onChangeSearch={handleChangeSearch}
          onSubmit={handleSearchSearch}
        />

        <Button variant="contained" onClick={syncSymbolData}>
          <StarIcon />
        </Button>
      </HStack>

      <SymbolList symbolList={symbolList} favoriteMap={favoriteMap} onClickFavorite={handleClickFavorite} />
    </VStack>
  );
};
