import { useState } from "react";
import { Box, Flex, Tab, TabList, Tabs, Text } from "@chakra-ui/react";
import { ProfitAndLossCalculator } from "../components";

export const CalculatePage = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabsChange = (index: number) => {
    setTabIndex(index);
  };

  return (
    <Flex direction="column" w="full" h="full">
      <Tabs index={tabIndex} onChange={handleTabsChange}>
        <TabList>
          <Tab>Profit & Loss</Tab>
        </TabList>
      </Tabs>

      <Box overflow="hidden" flex="1" pt="48px" px="36px">
        {tabIndex === 0 ? <ProfitAndLossCalculator /> : <Text>{tabIndex}</Text>}
      </Box>
    </Flex>
  );
};
