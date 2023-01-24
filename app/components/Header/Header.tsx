import { Link } from "@remix-run/react";

import {
  CiDark,
  CiLight,
} from "react-icons/ci";

import Logo from "../../assets/logo.svg";

import {
  StyledHeader,
  StyledLogoBox,
  StyledToolbarSpacer,
  StyledToolbarGroup,
  StyledToolbarItem,
  StyledThemeBox,
} from "./Header.styled";

export const ThemeSwitcher = () => {
  return (
    <div>
      <label htmlFor="theme-switcher">Theme</label>
      <input type="checkbox" id="theme-switcher" />
    </div>
  );
};

const Header = () => {
  return (
    <StyledHeader>
      <StyledLogoBox>
        <img src={Logo} alt="" />
      </StyledLogoBox>
      <StyledToolbarSpacer />
      <StyledToolbarGroup>
        <StyledToolbarItem>
          <ThemeSwitcher />
        </StyledToolbarItem>
        <StyledToolbarItem>
          <StyledThemeBox>
            <CiDark />
            <CiLight />
          </StyledThemeBox>
          <Link to="/login">Login</Link>
        </StyledToolbarItem>
      </StyledToolbarGroup>
    </StyledHeader>
  );
};

export default Header;
