import React from "react";
import { Link } from "@remix-run/react";
import {
  CiShoppingCart,
  CiShop,
  CiSettings,
  CiUser,
  CiCoinInsert,
  CiGrid42,
  CiHome,
} from "react-icons/ci";

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
  StyledMenuIcon,
  StyledAnchor,
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
      icon: <CiHome />,
    },
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <CiGrid42 />,
    },
    {
      name: "Stores",
      path: "/stores",
      icon: <CiShop />,
    },
    {
      name: "Products",
      path: "/products",
      icon: <CiShoppingCart />,
    },
    {
      name: "Orders",
      path: "/orders",
      icon: <CiCoinInsert />,
    },
    {
      name: "Customers",
      path: "/customers",
      icon: <CiUser />,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: <CiSettings />,
    },
  ];
  return (
    <StyledLayout>
      <Header />
      <StyledContent>
        <StyledSidebar>
          <StyledSidebarLinks>
            {links.map((link) => (
              <Link to={link.path} key={link.name}>
                <StyledLink>
                  <StyledMenuIcon>{link.icon}</StyledMenuIcon>
                  <StyledAnchor>{link.name}</StyledAnchor>
                </StyledLink>
              </Link>
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
