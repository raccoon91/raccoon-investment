import { Divider, styled } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import StarIcon from "@mui/icons-material/Star";
import CalculateIcon from "@mui/icons-material/Calculate";
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

      <NavIcon to="/symbols" title="Symbol">
        <LocalAtmIcon />
      </NavIcon>

      <NavIcon to="/favorites" title="Favorite">
        <StarIcon />
      </NavIcon>

      <Divider />

      <NavIcon to="/calculators" title="Calculator">
        <CalculateIcon />
      </NavIcon>
    </StyledNavList>
  );
};
