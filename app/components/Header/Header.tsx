import { Link } from "@remix-run/react";

import {
  StyledHeader,
  StyledToolbar,
  StyledToolbarTitle,
  StyledToolbarSpacer,
  StyledToolbarGroup,
  StyledToolbarItem,
} from "./Header.styled";

const Header = () => {
  return (
    <StyledHeader>
      <StyledToolbar>
        <StyledToolbarTitle>Kuisoko</StyledToolbarTitle>
        <StyledToolbarSpacer />
        <StyledToolbarGroup>
          <StyledToolbarItem>
            <Link to="/">Profile</Link>
          </StyledToolbarItem>
          <StyledToolbarItem>
            <Link to="/login">Login</Link>
          </StyledToolbarItem>
        </StyledToolbarGroup>
      </StyledToolbar>
    </StyledHeader>
  );
};

export default Header;
