import { Divider, styled } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import BusinessIcon from "@mui/icons-material/Business";
import { NavIcon } from "./NavIcon";

const StyledNavList = styled("nav")`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0 10px;
`;

export const Sidebar = () => {
  return (
    <StyledNavList>
      <NavIcon to="/" title="Home">
        <HomeIcon />
      </NavIcon>

      <Divider />

      <NavIcon to="/etf" title="ETF">
        <LocalAtmIcon />
      </NavIcon>

      <NavIcon to="/stocks" title="Stock">
        <BusinessIcon />
      </NavIcon>
    </StyledNavList>
  );
};
