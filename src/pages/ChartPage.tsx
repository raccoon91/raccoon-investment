import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Box,
  Button,
  Center,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  HStack,
  Heading,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tag,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { Bookmark, ChevronDown, DollarSign, DownloadCloud, Plus, Save } from "react-feather";
import { Chart } from "../components";
import { useChartStore, useFavoriteStore, useMarkerStore, useTradeStore } from "../stores";

export const ChartPage = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
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
  const { trades, tradeJson, addTrade, changeTrade, getTradeData, saveTradeData } = useTradeStore(state => ({
    trades: state.trades,
    tradeJson: state.tradeJson,
    addTrade: state.addTrade,
    changeTrade: state.changeTrade,
    getTradeData: state.getTradeData,
    saveTradeData: state.saveTradeData,
  }));
  const { markers, markerJson, addMarker, changeMarker, getMarkerData, saveMarkerData } = useMarkerStore(state => ({
    markers: state.markers,
    markerJson: state.markerJson,
    addMarker: state.addMarker,
    changeMarker: state.changeMarker,
    getMarkerData: state.getMarkerData,
    saveMarkerData: state.saveMarkerData,
  }));
  const [isOpenTradeDrawer, setIsOpenTradeDrawer] = useState(false);
  const [isOpenMarkerDrawer, setIsOpenMarkerDrawer] = useState(false);

  const isEmpty = useMemo(() => !!chartValues && chartValues.length === 0, [chartValues]);

  useEffect(() => {
    getFavoriteList();

    if (!params.get("symbolId")) return;

    getChartData(params.get("symbolId"));
    getTradeData(params.get("symbolId"));
    getMarkerData(params.get("symbolId"));

    return () => {
      clearChartData();
    };
  }, [params]);

  const handleClickSyncChartData = async () => {
    if (!params.get("symbolId")) return;

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

  const handleAddBuy = () => {
    addTrade(params.get("symbolId"), "buy");
  };

  const handleAddSell = () => {
    addTrade(params.get("symbolId"), "sell");
  };

  const handleChangeTrade = (e: ChangeEvent<HTMLTextAreaElement>) => {
    changeTrade(e.target.value);
  };

  const handleSaveTrade = async () => {
    await saveTradeData();
    await getTradeData(params.get("symbolId"));
  };

  const handleAddMarker = () => {
    addMarker(params.get("symbolId"));
  };

  const handleChangeMarker = (e: ChangeEvent<HTMLTextAreaElement>) => {
    changeMarker(e.target.value);
  };

  const handleSaveMarker = async () => {
    await saveMarkerData();
    await getMarkerData(params.get("symbolId"));
  };

  const handleSelectSymbol = (symbolId?: number) => () => {
    navigate(`/charts?symbolId=${symbolId}`);
  };

  return (
    <>
      <Drawer size="sm" placement="right" onClose={handleCloseTradeDrawer} isOpen={isOpenTradeDrawer}>
        <DrawerOverlay />

        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">{symbol?.name}</DrawerHeader>

          <DrawerBody>
            <Flex direction="column" gap="16px">
              <HStack justify="flex-start">
                <Heading as="h5" fontSize="16px">
                  Trade
                </Heading>

                <Button ml="auto" variant="ghost" colorScheme="blue" onClick={handleAddBuy}>
                  Buy
                </Button>

                <Button ml="8px" variant="ghost" colorScheme="red" onClick={handleAddSell}>
                  Sell
                </Button>
              </HStack>

              <Textarea h="300px" resize="none" value={tradeJson} onChange={handleChangeTrade} />

              <Box textAlign="right">
                <IconButton aria-label="save dividen" icon={<Icon as={Save} />} onClick={handleSaveTrade} />
              </Box>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <Drawer size="sm" placement="right" onClose={handleCloseMarkerDrawer} isOpen={isOpenMarkerDrawer}>
        <DrawerOverlay />

        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">{symbol?.name}</DrawerHeader>

          <DrawerBody>
            <Flex direction="column" gap="16px">
              <HStack justify="space-between">
                <Heading as="h5" fontSize="16px">
                  Marker
                </Heading>

                <IconButton
                  variant="ghost"
                  aria-label="add dividen"
                  icon={<Icon as={Plus} />}
                  onClick={handleAddMarker}
                />
              </HStack>

              <Textarea h="300px" resize="none" value={markerJson} onChange={handleChangeMarker} />

              <Box textAlign="right">
                <IconButton aria-label="save dividen" icon={<Icon as={Save} />} onClick={handleSaveMarker} />
              </Box>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <VStack overflow="auto" gap="24px" align="stretch" w="full" h="full">
        <HStack>
          <HStack gap="16px">
            <Tag>{symbol?.ticker ?? "NONE"}</Tag>

            <Menu>
              <MenuButton
                as={Button}
                size="sm"
                rightIcon={<ChevronDown />}
                variant="ghost"
                colorScheme="gray"
                value={symbol?.name}
              >
                {symbol ? symbol?.name?.toUpperCase() : "Select symbol"}
              </MenuButton>
              <MenuList zIndex="10">
                {favoriteList.map(favorite => (
                  <MenuItem key={favorite.id} onClick={handleSelectSymbol(favorite.symbols?.id)}>
                    {favorite.symbols?.name}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
          </HStack>

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

        <Box flex="1">
          {isEmpty ? (
            <Center w="full" h="full">
              <Text>No Chart Data</Text>
            </Center>
          ) : (
            <Chart chartValues={chartValues} trades={trades} markers={markers} />
          )}
        </Box>
      </VStack>
    </>
  );
};
