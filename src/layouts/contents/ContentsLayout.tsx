import { FC, PropsWithChildren, ReactNode } from "react";
import { Box, Wrap } from "@chakra-ui/react";

interface IContentsLayoutProps {
  left?: ReactNode;
  right?: ReactNode;
}

export const ContentsLayout: FC<PropsWithChildren<IContentsLayoutProps>> = ({ left, right, children }) => {
  return (
    <Box h="full" p="30px">
      {left && right ? (
        <Wrap justify="space-between" mb="24px">
          <Box>{left}</Box>
          <Box>{right}</Box>
        </Wrap>
      ) : left && !right ? (
        <Box mb="24px">{left}</Box>
      ) : !left && right ? (
        <Box mb="24px" textAlign="right">
          {right}
        </Box>
      ) : null}

      <Box overflow="auto" h="calc(100% - 64px)">
        {children}
      </Box>
    </Box>
  );
};
