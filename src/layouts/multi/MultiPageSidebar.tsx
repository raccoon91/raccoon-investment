import { Flex } from "@chakra-ui/react";
import { FC } from "react";
import { NavLink } from "./NavLink";

interface IMultiPageSidebarProps {
  menus: { to: string; label: string }[];
}

export const MultiPageSidebar: FC<IMultiPageSidebarProps> = ({ menus }) => {
  return (
    <Flex
      direction="column"
      gap="8px"
      w="200px"
      h="full"
      py="8px"
      px="8px"
      borderRight="1px solid"
      borderColor="border"
    >
      {menus.map(menu => (
        <NavLink key={menu.label} {...menu}>
          {menu.label}
        </NavLink>
      ))}
    </Flex>
  );
};
