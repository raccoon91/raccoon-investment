import { FC, PropsWithChildren, ReactNode } from "react";
import { Outlet } from "react-router-dom";
import { Box, Flex } from "@chakra-ui/react";

interface IMultiPageLayoutProps {
  sidebar?: ReactNode;
}

export const MultiPageLayout: FC<PropsWithChildren<IMultiPageLayoutProps>> = ({ sidebar }) => {
  return (
    <Flex w="full" h="full">
      {sidebar && sidebar}

      <Box w="calc(100% - 201px)" h="full">
        <Outlet />
      </Box>
    </Flex>
  );
};
