import { NavLink } from "react-router-dom";
import { List, ListItemButton, ListItemIcon, ListItemText, styled } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import BusinessIcon from "@mui/icons-material/Business";

const StyledNavLink = styled(NavLink)(
  ({ theme }) => `
    display: block;
    color: ${theme.palette.text.primary};
    text-decoration: none;

    &.active {
      color: ${theme.palette.getContrastText(theme.palette.primary.main)};
      background-color: ${theme.palette.primary.main};

      svg {
        color: ${theme.palette.getContrastText(theme.palette.primary.main)};
      }
    }
  `
);

export const Sidebar = () => {
  return (
    <List sx={{ width: "100%", padding: 0 }} component="nav">
      <StyledNavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
        <ListItemButton>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>
      </StyledNavLink>
      <StyledNavLink to="/etf" className={({ isActive }) => (isActive ? "active" : "")}>
        <ListItemButton>
          <ListItemIcon>
            <LocalAtmIcon />
          </ListItemIcon>
          <ListItemText primary="ETF" />
        </ListItemButton>
      </StyledNavLink>
      <StyledNavLink to="/stocks" className={({ isActive }) => (isActive ? "active" : "")}>
        <ListItemButton>
          <ListItemIcon>
            <BusinessIcon />
          </ListItemIcon>
          <ListItemText primary="Stock" />
        </ListItemButton>
      </StyledNavLink>
    </List>
  );
};
