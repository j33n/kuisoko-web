import {Header} from '../';

import { StyledLayout, StyledBody } from "./Layout.styled";

const Layout = ({ children }: any) => {
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
      <StyledBody>{children}</StyledBody>
      </StyledLayout>
  );
}

export default Layout;
