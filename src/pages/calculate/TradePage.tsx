import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Box, Flex, Table, TableContainer, Tbody, Td, Thead, Tr } from "@chakra-ui/react";
import { useFavoriteStore, useSymbolStore, useTradeStore } from "../../stores";
import { CalculateBuyPrice, CalculateSellPrice, calculateBuyPrice, calculateSellPrice } from "../../utils";
import { Select } from "../../components";

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
  const { trades, getTradeData } = useTradeStore(state => ({
    trades: state.trades,
    getTradeData: state.getTradeData,
  }));
  const [outputs, setOutputs] = useState<
    (
      | ({ type: "buy" } & Partial<ReturnType<CalculateBuyPrice>>)
      | ({ type: "sell" } & Partial<ReturnType<CalculateSellPrice>>)
    )[]
  >([]);

  useEffect(() => {
    getFavoriteList();

    if (!params.get("symbolId")) return;

    getSymbolData(params.get("symbolId"));
    getTradeData(params.get("symbolId"));
  }, [params]);

  useEffect(() => {
    setOutputs(
      trades?.map(trade =>
        trade.type === "buy"
          ? {
              type: trade.type,
              ...calculateBuyPrice({
                bp: trade.price,
                nos: trade.count,
                bcp: trade.commission,
              }),
            }
          : {
              type: trade.type,
              ...calculateSellPrice({
                sp: trade.price,
                nos: trade.count,
                scp: trade.commission,
              }),
            }
      ) ?? []
    );
  }, [trades]);

  const handleSelectSymbol = (symbolId?: number) => {
    navigate(`/calculates/trade?symbolId=${symbolId}`);
  };

  return (
    <Flex direction="column" gap="16px" w="full" h="full">
      <Box>
        <Select
          size="sm"
          variant="outline"
          colorScheme="gray"
          value={symbol?.id}
          options={favoriteList.map(favorite => ({ value: favorite.symbols?.id, label: favorite.symbols?.name }))}
          onChange={handleSelectSymbol}
        />
      </Box>

      <TableContainer overflowX="auto" w="full" flex="1">
        <Table>
          <Thead>
            <Tr>
              <Td whiteSpace="nowrap">Type</Td>
              <Td whiteSpace="nowrap">Price</Td>
              <Td whiteSpace="nowrap">Buying Commission</Td>
              <Td whiteSpace="nowrap">Selling Commission</Td>
              <Td whiteSpace="nowrap">TAF Tax</Td>
              <Td whiteSpace="nowrap">SEC Tax</Td>
              <Td whiteSpace="nowrap">Total Tax</Td>
              <Td whiteSpace="nowrap">Profit And Loss</Td>
            </Tr>
          </Thead>
          <Tbody>
            {outputs.map((output, index) =>
              output.type === "buy" ? (
                <Tr key={index}>
                  <Td>{output.type.toUpperCase()}</Td>
                  <Td>{output.price}</Td>
                  <Td>{output.buyingCommission}</Td>
                  <Td>-</Td>
                  <Td>-</Td>
                  <Td>-</Td>
                  <Td>-</Td>
                  <Td>{output.price}</Td>
                </Tr>
              ) : (
                <Tr key={index}>
                  <Td>{output.type.toUpperCase()}</Td>
                  <Td>{output.price}</Td>
                  <Td>-</Td>
                  <Td>{output.sellingCommission}</Td>
                  <Td>{output.TAFTax}</Td>
                  <Td>{output.SECTax}</Td>
                  <Td>{output.transactionTax}</Td>
                  <Td>{output.calculatePrice}</Td>
                </Tr>
              )
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  );
};
