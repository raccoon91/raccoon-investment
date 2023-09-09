import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Box, Flex, Tab, TabList, Tabs } from "@chakra-ui/react";

const tabList = ["/calculates", "/calculates/trade"];

const pathToTab = tabList.reduce(
  (acc, cur, index) => {
    acc[cur] = index;

    return acc;
  },
  {} as Record<string, number>
);

const tabToPath = tabList.reduce(
  (acc, cur, index) => {
    acc[index] = cur;

    return acc;
  },
  {} as Record<number, string>
);

export const CalculatePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [tabIndex, setTabIndex] = useState<number | undefined>(undefined);

  useEffect(() => {
    setTabIndex(pathToTab[location.pathname] ?? 0);
  }, [location, pathToTab]);

  const handleTabsChange = (index: number) => {
    const path = tabToPath[index] ?? "/calculates";

    navigate(path);
  };

  return (
    <Flex direction="column" w="full" h="full">
      <Tabs index={tabIndex} onChange={handleTabsChange}>
        <TabList>
          <Tab>Profit & Loss</Tab>
          <Tab>Trade</Tab>
        </TabList>
      </Tabs>

      <Box h="calc(100% - 42px)" pt="24px" px="36px">
        <Outlet />
      </Box>
    </Flex>
  );
};
