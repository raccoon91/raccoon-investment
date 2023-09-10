import { FC, PropsWithChildren } from "react";
import { NavLink } from "react-router-dom";
import { Link, Tooltip, useColorModeValue } from "@chakra-ui/react";

interface INavIconProps {
  to: string;
  label: string;
}

export const NavIcon: FC<PropsWithChildren<INavIconProps>> = ({ to, label, children }) => {
  const bg = useColorModeValue("gray.100", "gray.700");

  return (
    <Tooltip label={label} placement="right">
      <Link
        to={to}
        as={NavLink}
        data-testid={`${label}-sidebar-link`}
        position="relative"
        display="flex"
        alignItems="center"
        justifyContent="center"
        w="40px"
        h="40px"
        _activeLink={{
          "&:after": {
            content: '""',
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundColor: bg,
            borderRadius: "4px",
            zIndex: "-1",
          },
        }}
        _hover={{
          opacity: 0.7,

          "&:after": {
            content: '""',
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundColor: bg,
            borderRadius: "4px",
            zIndex: "-1",
          },
        }}
      >
        {children}
      </Link>
    </Tooltip>
  );
};
