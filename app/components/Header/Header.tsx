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
  const user = "Jean Abayo"
  return (
    <StyledHeader>
      <StyledLogoBox>
        <img src={Logo} alt="" />
      </StyledLogoBox>
      <StyledToolbarSpacer/>
      <StyledToolbarGroup>
        <StyledToolbarItem>
          <Link to="/">Profile</Link>
        </StyledToolbarItem>
        <StyledToolbarItem>
          <Link to="/login">Login</Link>
        </StyledToolbarItem>
      </StyledToolbarGroup>
      <h1 className="text-2xl font-bold">Welcome {user}</h1>
    </StyledHeader>
  );
};

export default Header;
