import React from "react";
import { Header } from "../";

import { StyledLayout, StyledContent } from "./Layout.styled";

export interface ILayout {
  children: React.ReactNode;
}

const Layout = ({ children }: ILayout) => {
  return (
    // Toolbar/Navbar, Footer
    <StyledLayout>
      <Header />
      {/* <StyledSidebar>
        <StyledSidebarTitle>My App</StyledSidebarTitle>
        <StyledSidebarSpacer />
        <StyledSidebarGroup>
          <StyledSidebarItem>
            <StyledLink to="/">Home</StyledLink>
          </StyledSidebarItem>
          <StyledSidebarItem>
            <StyledLink to="/about">About</StyledLink>
          </StyledSidebarItem>
        </StyledSidebarGroup>
      </StyledSidebar> */}
      <StyledContent>{children}</StyledContent>
    </StyledLayout>
  );
};

export default Layout;
