import { ChangeEventHandler, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Button, Chip, Drawer, Typography, styled } from "@mui/material";
import CloudSyncIcon from "@mui/icons-material/CloudSync";
import SettingsIcon from "@mui/icons-material/Settings";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import { useChartStore, useMarkerStore } from "../stores";
import { Chart } from "../components";

const Textarea = styled("textarea")(
  ({ theme }) => `
    width: 100%;
    height: 100%;
    background: ${theme.palette.background.paper};
    padding: 8px;
    border-radius: 4px;
    border-color: ${theme.palette.divider};
    color: ${theme.palette.text.primary};
    font-size: 16px;
    resize: none;
  `
);

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
    await getChartData(params?.symbolId);
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

  const handleChangeMarker: ChangeEventHandler<HTMLTextAreaElement> = e => {
    changeMarker(e.target.value);
  };

  const handleSaveMarker = async () => {
    await saveMarkerData();
    await getMarkerData(params?.symbolId);
  };

  return (
    <>
      <Drawer anchor="right" open={isOpenDrawer} onClose={handleCloseDrawer}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "24px", width: "360px", padding: "12px 24px" }}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Typography>Dividen</Typography>

            <Button color="primary">
              <AddIcon onClick={handleAddMarker} />
            </Button>
          </Box>

          <Box sx={{ height: "360px" }}>
            <Textarea value={markerJson} onChange={handleChangeMarker} />
          </Box>

          <Box sx={{ textAlign: "right" }}>
            <Button variant="contained" color="success">
              <SaveIcon onClick={handleSaveMarker} />
            </Button>
          </Box>
        </Box>
      </Drawer>

      <Box
        sx={{ overflow: "auto", display: "flex", flexDirection: "column", gap: "24px", width: "100%", height: "100%" }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {symbol && (
            <Box sx={{ display: "flex", alignItems: "center", gap: "24px" }}>
              <Chip label={symbol?.ticker} />
              <Typography>{symbol?.name}</Typography>
            </Box>
          )}

          <Button sx={{ marginLeft: "auto" }} onClick={handleClickSyncChartData}>
            <CloudSyncIcon />
          </Button>

          <Button color="info" onClick={handleOpenDrawer}>
            <SettingsIcon />
          </Button>
        </Box>

        <Box sx={{ flex: 1 }}>
          {isEmpty ? (
            <Box
              sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100%" }}
            >
              <Typography sx={{ fontWeight: "bold" }}>No Chart Data</Typography>
            </Box>
          ) : (
            <Chart chartValues={chartValues} markers={markers} />
          )}
        </Box>
      </Box>
    </>
  );
};
