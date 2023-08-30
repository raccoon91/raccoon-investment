import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Button, Flex, Tag, Text, VStack } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
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

  // const handleCloseDrawer = () => {
  //   setIsOpenDrawer(false);
  // };

  // const handleAddMarker = () => {
  //   addMarker(params?.symbolId);
  // };

  // const handleChangeMarker: ChangeEventHandler<HTMLTextAreaElement> = e => {
  //   changeMarker(e.target.value);
  // };

  // const handleSaveMarker = async () => {
  //   await saveMarkerData();
  //   await getMarkerData(params?.symbolId);
  // };

  return (
    <>
      {/* <Drawer anchor="right" open={isOpenDrawer} onClose={handleCloseDrawer}>
        <VStack gap="24px" w="36px" p="12px 24px">
          <HStack justify="space-between">
            <Text>Dividen</Text>

            <Button>
              <StarIcon onClick={handleAddMarker} />
            </Button>
          </HStack>

          <Box height="360px">
            <Textarea value={markerJson} onChange={handleChangeMarker} />
          </Box>

          <Box textAlign="right">
            <Button variant="contained" color="success">
              <StarIcon onClick={handleSaveMarker} />
            </Button>
          </Box>
        </VStack>
      </Drawer> */}

      <VStack overflow="auto" gap="24px" w="full" h="full">
        <Flex>
          {symbol && (
            <Flex gap="24px">
              <Tag>{symbol?.ticker}</Tag>
              <Text>{symbol?.name}</Text>
            </Flex>
          )}

          <Button ml="auto" onClick={handleClickSyncChartData}>
            <StarIcon />
          </Button>

          <Button color="info" onClick={handleOpenDrawer}>
            <StarIcon />
          </Button>
        </Flex>

        <Box flex="1">
          {isEmpty ? (
            <Flex w="full" h="full">
              <Text>No Chart Data</Text>
            </Flex>
          ) : (
            <Chart chartValues={chartValues} markers={markers} />
          )}
        </Box>
      </VStack>
    </>
  );
};
