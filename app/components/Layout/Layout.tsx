import React from "react";
import { Link } from "@remix-run/react";

import { Header } from "../";

import {
  StyledLayout,
  StyledContent,
  StyledTitle,
  StyledLink,
  StyledSidebar,
  StyledSidebarLinks,
  StyledSidebarFooter,
  StyledBodyContent,
} from "./Layout.styled";

export interface ILayout {
  children: React.ReactNode;
}

const Layout = ({ children }: ILayout) => {
  const user = "Jean Abayo";
  const links = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Dashboard",
      path: "/dashboard",
    },
    {
      name: "Stores",
      path: "/stores",
    },
    {
      name: "Products",
      path: "/products",
    },
    {
      name: "Orders",
      path: "/orders",
    },
    {
      name: "Customers",
      path: "/customers",
    },
    {
      name: "Settings",
      path: "/settings",
    },
  ];
  return (
    <StyledLayout>
      <Header />
      <StyledContent>
        <StyledSidebar>
          <StyledSidebarLinks>
            {links.map((link) => (
              <StyledLink key={link.name}>
                <Link to={link.path}>{link.name}</Link>
              </StyledLink>
            ))}
          </StyledSidebarLinks>
          <StyledSidebarFooter>
            <StyledLink>
              test@test.com
              <Link to="/logout">Logout</Link>
            </StyledLink>
          </StyledSidebarFooter>
        </StyledSidebar>
        <StyledBodyContent>
          <StyledTitle className="text-2xl font-bold">
            Welcome {user}
          </StyledTitle>
          {children}
        </StyledBodyContent>
      </StyledContent>
    </StyledLayout>
  );
};

export default Layout;
