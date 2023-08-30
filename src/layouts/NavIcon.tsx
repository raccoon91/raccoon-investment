import { FC, PropsWithChildren } from "react";
import { NavLink } from "react-router-dom";
import { Link, Tooltip } from "@chakra-ui/react";

interface INavIconProps {
  to: string;
  label: string;
}

export const NavIcon: FC<PropsWithChildren<INavIconProps>> = ({ to, label, children }) => {
  return (
    <Tooltip label={label} placement="right">
      <Link
        to={to}
        as={NavLink}
        position="relative"
        display="flex"
        alignItems="center"
        justifyContent="center"
        w="40px"
        h="40px"
        textDecoration="none"
        sx={{
          svg: {
            width: "20px",
            height: "20px",
            color: "gray.300",
          },
        }}
        _activeLink={{
          "&.active, &:hover": {
            "&:after": {
              content: '""',
              position: "absolute",
              width: "100%",
              height: "100%",
              backgroundColor: "gray.500",
              borderRadius: "4px",
              zIndex: "-1",
            },

            svg: {
              width: "20px",
              height: "20px",
              color: "gray.500",
            },
          },

          "&:hover": {
            opacity: 0.7,
          },
        }}
      >
        {children}
      </Link>
    </Tooltip>
  );
};
