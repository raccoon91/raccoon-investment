import { useSearchParams } from "react-router-dom";
import { Box, Button, Chip, Typography } from "@mui/material";
import CloudSyncIcon from "@mui/icons-material/CloudSync";
import { useChartStore } from "../stores";
import { Chart } from "../components";
import { useEffect, useMemo } from "react";

export const ChartPage = () => {
  const [params] = useSearchParams();
  const { symbolData, chartValues, getChartData, syncChartData } = useChartStore(state => ({
    symbolData: state.symbolData,
    chartValues: state.chartValues,
    getChartData: state.getChartData,
    syncChartData: state.syncChartData,
  }));

  const isEmpty = useMemo(() => !!chartValues && chartValues.length === 0, [chartValues]);

  useEffect(() => {
    const symbol = params?.get("symbol");
    const type = params?.get("type");

    if (!symbol || !type) return;

    getChartData(symbol, type);
  }, [params, getChartData]);

  const handleClickSyncChartData = async () => {
    const symbol = params?.get("symbol");
    const type = params?.get("type");

    if (!symbol || !type) return;

    syncChartData(symbol, type);
  };

  return (
    <Box
      sx={{
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        width: "100%",
        height: "100%",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {symbolData && (
          <Box sx={{ display: "flex", alignItems: "center", gap: "24px" }}>
            <Chip label={symbolData?.symbol} />
            <Typography>{symbolData?.name}</Typography>
          </Box>
        )}

        <Button variant="contained" sx={{ marginLeft: "auto" }} onClick={handleClickSyncChartData}>
          <CloudSyncIcon />
        </Button>
      </Box>

      <Box sx={{ flex: 1 }}>
        {isEmpty ? (
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100%" }}>
            <Typography sx={{ fontWeight: "bold" }}>No Chart Data</Typography>
          </Box>
        ) : (
          <Chart chartValues={chartValues} />
        )}
      </Box>
    </Box>
  );
};
