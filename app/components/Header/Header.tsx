import { Link } from "@remix-run/react";

import Logo from "../../assets/logo.svg";

import {
  StyledHeader,
  StyledLogoBox,
  StyledToolbarSpacer,
  StyledToolbarGroup,
  StyledToolbarItem,
} from "./Header.styled";

const Header = () => {
  return (
    <StyledHeader>
      <StyledLogoBox>
        <img src={Logo} alt="" />
      </StyledLogoBox>
      <StyledToolbarSpacer />
      <StyledToolbarGroup>
        <StyledToolbarItem>
          <Link to="/">Profile</Link>
        </StyledToolbarItem>
        <StyledToolbarItem>
          <Link to="/login">Login</Link>
        </StyledToolbarItem>
      </StyledToolbarGroup>
    </StyledHeader>
  );
};

export default Header;
