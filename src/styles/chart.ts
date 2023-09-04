import { baseTheme, useColorModeValue } from "@chakra-ui/react";

export const useChartTheme = () => {
  const bg = useColorModeValue(baseTheme.colors.whiteAlpha[900], baseTheme.colors.gray[800]);
  const text = useColorModeValue(baseTheme.colors.gray[800], baseTheme.colors.whiteAlpha[900]);
  const border = useColorModeValue(baseTheme.colors.gray[200], baseTheme.colors.whiteAlpha[400]);
  const down = useColorModeValue(baseTheme.colors.blue[400], baseTheme.colors.blue[600]);
  const up = useColorModeValue(baseTheme.colors.red[400], baseTheme.colors.red[600]);
  const greenMarker = useColorModeValue(baseTheme.colors.teal[500], baseTheme.colors.teal[300]);
  const blueMarker = useColorModeValue(baseTheme.colors.blue[600], baseTheme.colors.blue[400]);
  const redMarker = useColorModeValue(baseTheme.colors.red[600], baseTheme.colors.red[400]);

  return {
    bg,
    text,
    border,
    up,
    down,
    greenMarker,
    blueMarker,
    redMarker,
  };
};
