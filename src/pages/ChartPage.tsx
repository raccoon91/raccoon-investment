import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
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
  Tag,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { DownloadCloud, Plus, Save, Settings } from "react-feather";
import { Chart } from "../components";
import { useChartStore, useMarkerStore } from "../stores";

export const ChartPage = () => {
  const params = useParams();
  const { symbol, chartValues, getChartData, syncChartData, clearChartData } = useChartStore(state => ({
    symbol: state.symbol,
    chartValues: state.chartValues,
    getChartData: state.getChartData,
    syncChartData: state.syncChartData,
    clearChartData: state.clearChartData,
  }));
  const { markers, markerJson, addMarker, changeMarker, getMarkerData, saveMarkerData } = useMarkerStore(state => ({
    markers: state.markers,
    markerJson: state.markerJson,
    addMarker: state.addMarker,
    changeMarker: state.changeMarker,
    getMarkerData: state.getMarkerData,
    saveMarkerData: state.saveMarkerData,
  }));
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);

  const isEmpty = useMemo(() => !!chartValues && chartValues.length === 0, [chartValues]);

  useEffect(() => {
    if (!params?.symbolId) return;

    getChartData(params?.symbolId);
    getMarkerData(params?.symbolId);

    return () => {
      clearChartData();
    };
  }, [params]);

  const handleClickSyncChartData = async () => {
    if (!params?.symbolId) return;

    await syncChartData(params?.symbolId);
  };

  const handleOpenDrawer = () => {
    setIsOpenDrawer(true);
  };

  const handleCloseDrawer = () => {
    setIsOpenDrawer(false);
  };

  const handleAddMarker = () => {
    addMarker(params?.symbolId);
  };

  const handleChangeMarker = (e: ChangeEvent<HTMLTextAreaElement>) => {
    changeMarker(e.target.value);
  };

  const handleSaveMarker = async () => {
    await saveMarkerData();
    await getMarkerData(params?.symbolId);
  };

  return (
    <>
      <Drawer size="sm" placement="right" onClose={handleCloseDrawer} isOpen={isOpenDrawer}>
        <DrawerOverlay />

        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">{symbol?.name}</DrawerHeader>

          <DrawerBody>
            <Flex direction="column" gap="16px">
              <HStack justify="space-between">
                <Heading as="h5" fontSize="16px">
                  Dividen
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
          {symbol && (
            <HStack gap="24px">
              <Tag>{symbol?.ticker}</Tag>
              <Text>{symbol?.name}</Text>
            </HStack>
          )}

          <IconButton
            ml="auto"
            aria-label="sync database"
            icon={<Icon as={DownloadCloud} />}
            onClick={handleClickSyncChartData}
          />

          <IconButton
            ml="8px"
            colorScheme="gray"
            aria-label="sync database"
            icon={<Icon as={Settings} />}
            onClick={handleOpenDrawer}
          />
        </HStack>

        <Box flex="1">
          {isEmpty ? (
            <Center w="full" h="full">
              <Text>No Chart Data</Text>
            </Center>
          ) : (
            <Chart chartValues={chartValues} markers={markers} />
          )}
        </Box>
      </VStack>
    </>
  );
};
