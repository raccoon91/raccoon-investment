import { StackDivider, VStack } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { NavIcon } from "./NavIcon";

export const Sidebar = () => {
  return (
    <VStack as="nav" spacing="8px" divider={<StackDivider borderColor="gray.700" />}>
      <NavIcon to="/" label="Home">
        <StarIcon />
      </NavIcon>

      <NavIcon to="/symbols" label="Symbol">
        <StarIcon />
      </NavIcon>

      <NavIcon to="/favorites" label="Favorite">
        <StarIcon />
      </NavIcon>

      <NavIcon to="/calculators" label="Calculator">
        <StarIcon />
      </NavIcon>
    </VStack>
  );
};
