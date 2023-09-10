import { FC, PropsWithChildren } from "react";
import { NavLink as RouterNavLink } from "react-router-dom";
import { Link, useColorModeValue } from "@chakra-ui/react";

interface INavLinkProps {
  to: string;
  label: string;
}

export const NavLink: FC<PropsWithChildren<INavLinkProps>> = ({ to, label, children }) => {
  const bg = useColorModeValue("gray.100", "gray.700");
  const text = useColorModeValue("teal.500", "teal.300");

  return (
    <Link
      to={to}
      end
      as={RouterNavLink}
      data-testid={`${label}-multi-sidebar-link`}
      position="relative"
      display="flex"
      alignItems="center"
      w="full"
      h="40px"
      px="16px"
      _activeLink={{
        color: text,

        "&:after": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
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
          top: 0,
          left: 0,
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
  );
};
