import { useEffect, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import DataGrid, { RenderEditCellProps } from "react-data-grid";
import { Input } from "@chakra-ui/react";
import { ContentsLayout } from "../../layouts";
import { Select } from "../../components";
import { useDividenStore, useFavoriteStore, useSymbolStore } from "../../stores";

import "react-data-grid/lib/styles.css";

const TextEditor = <TRow, TSummaryRow>({
  row,
  column,
  onRowChange,
  onClose,
}: RenderEditCellProps<TRow, TSummaryRow>) => {
  return (
    <Input
      w="full"
      h="full"
      ref={(input: HTMLInputElement | null) => {
        input?.focus();
        input?.select();
      }}
      value={row[column.key as keyof TRow] as unknown as string}
      onChange={event => onRowChange({ ...row, [column.key]: event.target.value })}
      onBlur={() => onClose(true, false)}
    />
  );
};

const columns = [
  { key: "id", name: "ID" },
  { key: "symbol_id", name: "Symbol", renderEditCell: TextEditor },
  { key: "date", name: "Date", renderEditCell: TextEditor },
];

export const DividenPage = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { symbol, getSymbolData } = useSymbolStore(state => ({
    symbol: state.symbol,
    getSymbolData: state.getSymbolData,
  }));
  const { favoriteList, getFavoriteList } = useFavoriteStore(state => ({
    favoriteList: state.favoriteList,
    getFavoriteList: state.getFavoriteList,
  }));
  const { dividens, getDividenData } = useDividenStore(state => ({
    dividens: state.dividens,
    getDividenData: state.getDividenData,
  }));

  const dividenRows = useMemo(
    () =>
      dividens.map(dividen => ({
        id: dividen.id,
        symbol_id: dividen.symbol_id,
        date: dividen.date,
      })),
    [dividens]
  );

  useEffect(() => {
    getFavoriteList();

    if (params.has("symbolId")) {
      getSymbolData(params.get("symbolId"));
      getDividenData(params.get("symbolId"));
    }
  }, [params]);

  const handleSelectSymbol = (symbolId?: number) => {
    navigate(`/settings?symbolId=${symbolId}`);
  };

  return (
    <ContentsLayout
      left={
        <Select
          size="sm"
          variant="outline"
          colorScheme="gray"
          value={symbol?.id}
          options={[
            { value: "all", label: "ALL" },
            ...favoriteList.map(favorite => ({
              value: favorite.symbols?.id,
              label: favorite.symbols?.name,
            })),
          ]}
          onChange={handleSelectSymbol}
        />
      }
    >
      <DataGrid
        columns={columns}
        rows={dividenRows}
        rowHeight={50}
        headerRowHeight={50}
        style={{
          overflow: "auto",
          width: "100%",
          height: "100%",
          fontSize: "16px",
          fontWeight: "normal",
        }}
      />
    </ContentsLayout>
  );
};
