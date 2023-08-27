import { FC, PropsWithChildren } from "react";
import { NavLink as BaseNavLink } from "react-router-dom";
import { Tooltip, styled } from "@mui/material";

const StyledNavLink = styled(BaseNavLink)(
  ({ theme }) => `
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    text-decoration: none;
    
    svg {
      width: 20px;
      height: 20px;
      color: ${theme.palette.grey[700]};
    }

    &.active, &:hover {
      &:after {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: ${theme.palette.divider};
        border-radius: 4px;
        z-index: -1;
      }

      svg {
        width: 20px;
        height: 20px;
        color: ${theme.palette.text.primary};
      }
    }

    &:hover {
      opacity: 0.7;
    }
  `
);

interface INavIconProps {
  to: string;
  title: string;
}

export const NavIcon: FC<PropsWithChildren<INavIconProps>> = ({ to, title, children }) => {
  return (
    <Tooltip title={title} placement="right">
      <StyledNavLink to={to} className={({ isActive }) => (isActive ? "active" : "")}>
        {children}
      </StyledNavLink>
    </Tooltip>
  );
};
