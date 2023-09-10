import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Center, HStack, Icon, IconButton, Tag, Text } from "@chakra-ui/react";
import { Bookmark, DollarSign, DownloadCloud } from "react-feather";
import { ContentsLayout } from "../layouts";
import { Chart, MarkerDrawer, Select, TradeDrawer } from "../components";
import { useChartStore, useFavoriteStore, useMarkerStore, useTradeStore } from "../stores";

export const ChartPage = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { favoriteList, getFavoriteList } = useFavoriteStore(state => ({
    favoriteList: state.favoriteList,
    getFavoriteList: state.getFavoriteList,
  }));
  const { symbol, chartValues, getChartData, syncChartData, clearChartData } = useChartStore(state => ({
    symbol: state.symbol,
    chartValues: state.chartValues,
    getChartData: state.getChartData,
    syncChartData: state.syncChartData,
    clearChartData: state.clearChartData,
  }));
  const trades = useTradeStore(state => state.trades);
  const markers = useMarkerStore(state => state.markers);
  const [isOpenTradeDrawer, setIsOpenTradeDrawer] = useState(false);
  const [isOpenMarkerDrawer, setIsOpenMarkerDrawer] = useState(false);

  const isEmpty = useMemo(() => !!chartValues && chartValues.length === 0, [chartValues]);

  useEffect(() => {
    getFavoriteList();

    if (!params.has("symbolId")) return;

    getChartData(params.get("symbolId"));

    return () => {
      clearChartData();
    };
  }, [params]);

  const handleClickSyncChartData = async () => {
    if (!params.has("symbolId")) return;

    await syncChartData(params.get("symbolId"));
  };

  const handleOpenTradeDrawer = () => {
    setIsOpenTradeDrawer(true);
  };

  const handleCloseTradeDrawer = () => {
    setIsOpenTradeDrawer(false);
  };

  const handleOpenMarkerDrawer = () => {
    setIsOpenMarkerDrawer(true);
  };

  const handleCloseMarkerDrawer = () => {
    setIsOpenMarkerDrawer(false);
  };

  const handleSelectSymbol = (symbolId?: number) => {
    navigate(`/charts?symbolId=${symbolId}`);
  };

  return (
    <>
      <TradeDrawer isOpen={!!symbol && isOpenTradeDrawer} symbol={symbol} onClose={handleCloseTradeDrawer} />

      <MarkerDrawer isOpen={!!symbol && isOpenMarkerDrawer} symbol={symbol} onClose={handleCloseMarkerDrawer} />

      <ContentsLayout
        left={
          <HStack gap="16px">
            <Tag>{symbol?.ticker ?? "NONE"}</Tag>

            <Select
              size="sm"
              variant="ghost"
              colorScheme="gray"
              value={symbol?.id}
              options={favoriteList.map(favorite => ({ value: favorite.symbols?.id, label: favorite.symbols?.name }))}
              onChange={handleSelectSymbol}
            />
          </HStack>
        }
        right={
          <HStack gap="8px">
            <IconButton
              ml="auto"
              colorScheme="blue"
              aria-label="sync database"
              icon={<Icon as={DownloadCloud} />}
              onClick={handleClickSyncChartData}
            />

            <IconButton
              ml="8px"
              colorScheme="orange"
              aria-label="sync database"
              icon={<Icon as={DollarSign} />}
              onClick={handleOpenTradeDrawer}
            />

            <IconButton
              ml="8px"
              colorScheme="teal"
              aria-label="sync database"
              icon={<Icon as={Bookmark} />}
              onClick={handleOpenMarkerDrawer}
            />
          </HStack>
        }
      >
        {isEmpty ? (
          <Center w="full" h="full">
            <Text>No Chart Data</Text>
          </Center>
        ) : (
          <Chart chartValues={chartValues} trades={trades} markers={markers} />
        )}
      </ContentsLayout>
    </>
  );
};
