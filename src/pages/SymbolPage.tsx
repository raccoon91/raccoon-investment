import { ChangeEvent, FormEvent, MouseEventHandler } from "react";
import { Icon, IconButton } from "@chakra-ui/react";
import { DownloadCloud } from "react-feather";
import { ContentsLayout } from "../layouts";
import { SearchInput, SymbolList } from "../components";
import { useFavoriteStore, useSymbolStore } from "../stores";

export const SymbolPage = () => {
  const { favoriteMap, toggleFavorite, getFavoriteMap } = useFavoriteStore(state => ({
    favoriteMap: state.favoriteMap,
    toggleFavorite: state.toggleFavorite,
    getFavoriteMap: state.getFavoriteMap,
  }));
  const { column, search, symbolList, changeColumn, changeSearch, searchSymbolData, syncSymbolData } = useSymbolStore(
    state => ({
      column: state.column,
      search: state.search,
      symbolList: state.symbolList,
      changeColumn: state.changeColumn,
      changeSearch: state.changeSearch,
      searchSymbolData: state.searchSymbolData,
      syncSymbolData: state.syncSymbolData,
    })
  );

  const handleChangeColumn = (value: string) => {
    changeColumn(value);
  };

  const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    changeSearch(e.target.value);
  };

  const handleSearchSearch = async (e: FormEvent<HTMLDivElement>) => {
    e.preventDefault();

    await searchSymbolData();
  };

  const handleClickFavorite: MouseEventHandler<HTMLButtonElement> = async e => {
    const symbolId = e.currentTarget.dataset["symbolId"];

    if (!symbolId) return;

    await toggleFavorite(symbolId);
    await getFavoriteMap();
  };

  return (
    <ContentsLayout
      left={
        <SearchInput
          column={column}
          search={search}
          onChangeColumn={handleChangeColumn}
          onChangeSearch={handleChangeSearch}
          onSubmit={handleSearchSearch}
        />
      }
      right={
        <IconButton
          aria-label="sync database"
          colorScheme="blue"
          icon={<Icon as={DownloadCloud} />}
          onClick={syncSymbolData}
        />
      }
    >
      <SymbolList symbolList={symbolList} favoriteMap={favoriteMap} onClickFavorite={handleClickFavorite} />
    </ContentsLayout>
  );
};
