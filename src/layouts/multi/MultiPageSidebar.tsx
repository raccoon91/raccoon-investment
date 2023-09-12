import { FC } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { NavLink } from "./NavLink";

interface IMultiPageSidebarProps {
  title: string;
  menus: { to: string; label: string }[];
}

export const MultiPageSidebar: FC<IMultiPageSidebarProps> = ({ title, menus }) => {
  return (
    <Box w="240px" h="full" borderRight="1px solid" borderColor="border">
      <Flex align="center" h="48px" px="24px" borderBottom="1px solid" borderColor="border">
        <Text fontWeight="bold">{title}</Text>
      </Flex>

      <Flex direction="column" flex="1" gap="8px" p="8px">
        {menus.map(menu => (
          <NavLink key={menu.label} {...menu}>
            {menu.label}
          </NavLink>
        ))}
      </Flex>
    </Box>
  );
};
