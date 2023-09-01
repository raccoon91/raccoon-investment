import { Icon, StackDivider, VStack } from "@chakra-ui/react";
import { DivideSquare, Home, Star, Tag } from "react-feather";
import { NavIcon } from "./NavIcon";

export const Sidebar = () => {
  return (
    <VStack
      w="40px"
      pt="48px"
      px="8px"
      flex="0 0 40px"
      borderRight="1px solid"
      borderColor="border"
      boxSizing="content-box"
      divider={<StackDivider borderColor="border" />}
    >
      <NavIcon to="/" label="Home">
        <Icon as={Home} boxSize="18px" />
      </NavIcon>

      <VStack as="nav" w="44px" spacing="8px">
        <NavIcon to="/symbols" label="Symbol">
          <Icon as={Tag} boxSize="18px" />
        </NavIcon>

        <NavIcon to="/favorites" label="Favorite">
          <Icon as={Star} boxSize="18px" />
        </NavIcon>
      </VStack>

      <NavIcon to="/calculators" label="Calculator">
        <Icon as={DivideSquare} boxSize="18px" />
      </NavIcon>
    </VStack>
  );
};
