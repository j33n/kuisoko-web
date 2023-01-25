import React from "react";
import { Link } from "@remix-run/react";
import { faker } from "@faker-js/faker";
import {
  CiShoppingCart,
  CiShop,
  CiSettings,
  CiUser,
  CiCoinInsert,
  CiGrid42,
  CiHome,
  CiCircleMore,
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
  StyledNameBox,
  StyledText,
  StyledProfileSide,
  StyledMoreBox,
} from "./Layout.styled";

export interface ILayout {
  children: React.ReactNode;
}

const Layout = ({ children }: ILayout) => {
  const name = faker.name.fullName();
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
  const email = faker.internet.email();
  const profilePicture = faker.image.avatar();

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
            <StyledProfileSide>
              <img src={profilePicture} alt="" />
            </StyledProfileSide>
            <StyledNameBox>
              <StyledText>{name}</StyledText>
              <StyledText disabled>{email}</StyledText>
            </StyledNameBox>
            <StyledMoreBox>
              <CiCircleMore />
            </StyledMoreBox>
          </StyledSidebarFooter>
        </StyledSidebar>
        <StyledBodyContent>{children}</StyledBodyContent>
      </StyledContent>
    </StyledLayout>
  );
};

export default Layout;
