import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Table, TableContainer, Tbody, Td, Thead, Tr } from "@chakra-ui/react";
import { ContentsLayout } from "../../layouts";
import { Select } from "../../components";
import { useFavoriteStore, useSymbolStore, useTradeStore } from "../../stores";
import { CalculateTrade, calculateTrade } from "../../utils";

export const TradePage = () => {
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
  const { trades, getTradeData, getAllTradeData } = useTradeStore(state => ({
    trades: state.trades,
    getTradeData: state.getTradeData,
    getAllTradeData: state.getAllTradeData,
  }));
  const [outputs, setOutputs] = useState<({ type: string; date: string } & Partial<ReturnType<CalculateTrade>>)[]>([]);

  useEffect(() => {
    getFavoriteList();

    if (!params.has("symbolId") || params.get("symbolId") === "all") {
      getAllTradeData();
    } else {
      getSymbolData(params.get("symbolId"));
      getTradeData(Number(params.get("symbolId")));
    }
  }, [params]);

  useEffect(() => {
    setOutputs(
      trades?.map(trade => ({
        type: trade.type,
        date: trade.date,
        ...calculateTrade({
          type: trade.type,
          bp: trade.type === "buy" ? trade.price : null,
          sp: trade.type === "buy" ? null : trade.price,
          nos: trade.count,
          bcp: trade.type === "buy" ? trade.commission : null,
          scp: trade.type === "buy" ? null : trade.commission,
        }),
      })) ?? []
    );
  }, [trades]);

  const handleSelectSymbol = (symbolId?: number) => {
    navigate(`/calculates/trade?symbolId=${symbolId}`);
  };

  return (
    <ContentsLayout
      left={
        <Select
          size="sm"
          variant="outline"
          colorScheme="gray"
          value={symbol?.id ?? params.get("symbolId") ?? "all"}
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
      <TableContainer overflowX="auto" overflowY="auto" w="full" flex="1">
        <Table>
          <Thead>
            <Tr>
              <Td whiteSpace="nowrap">Type</Td>
              <Td whiteSpace="nowrap">Price</Td>
              <Td whiteSpace="nowrap">Date</Td>
              <Td whiteSpace="nowrap">Buying Commission</Td>
              <Td whiteSpace="nowrap">Selling Commission</Td>
              <Td whiteSpace="nowrap">TAF Tax</Td>
              <Td whiteSpace="nowrap">SEC Tax</Td>
              <Td whiteSpace="nowrap">Total Tax</Td>
              <Td whiteSpace="nowrap">Profit And Loss</Td>
            </Tr>
          </Thead>
          <Tbody>
            {outputs.map((output, index) => (
              <Tr key={index}>
                <Td>{output.type.toUpperCase()}</Td>
                <Td>{output.price}</Td>
                <Td>{output.date}</Td>
                <Td>{output?.buyingCommission ?? "-"}</Td>
                <Td>{output?.sellingCommission ?? "-"}</Td>
                <Td>{output?.TAFTax ?? "-"}</Td>
                <Td>{output?.SECTax ?? "-"}</Td>
                <Td>{output?.transactionTax ?? "-"}</Td>
                <Td>{output.price}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </ContentsLayout>
  );
};
