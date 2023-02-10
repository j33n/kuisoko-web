import { Form, Link, useLoaderData } from "@remix-run/react";
import { faker } from "@faker-js/faker";
import styled from "@emotion/styled";
import {
  CiShoppingCart,
  CiShop,
  CiUser,
  CiCoinInsert,
  CiGrid42,
  CiCircleMore,
  CiPower,
} from "react-icons/ci";
import { Text } from "theme-ui";

import {
  StyledLink,
  StyledSidebar,
  StyledSidebarLinks,
  StyledSidebarFooter,
  StyledMenuIcon,
  StyledAnchor,
  StyledNameBox,
  StyledText,
  StyledProfileSide,
  StyledMoreBox,
  StyledBottomMenu,
  StyledToolbarItem,
} from "./Layout.styled";
import { StyledLogoutBtn } from "../Header/Header.styled";

import type { StyledTheme } from "~/styles/page.styled";

import type { loader } from "~/routes/__index";

export interface ISidebar {
  user: any;
}

const links = [
  {
    name: "My Stores",
    path: "/stores",
    icon: <CiShop />,
  },
  {
    name: "Items",
    path: "/items",
    icon: <CiShoppingCart />,
  },
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: <CiGrid42 />,
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
  // TODO: find better placemennt for settings link
  // {
  //   name: "Settings",
  //   path: "/settings",
  //   icon: <CiSettings />,
  // },
];

export const StyledStoresList = styled.div<StyledTheme>`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-top: 1px solid ${({ theme: { colors } }) => colors.border};
  border-bottom: 1px solid ${({ theme: { colors } }) => colors.border};
  padding: 0.5rem 0;
  overflow: scroll;
`;

export const StyledTitle = styled(Text)<StyledTheme>`
  font-size: 0.8rem;
  font-weight: 600;
  color: ${({ theme: { colors } }) => colors.text};
  margin-bottom: 0.5rem;
  text-align: center;
`;

const profilePicture = faker.image.avatar();

const Sidebar = () => {
  const data = useLoaderData<typeof loader>();

  const { user, storeList } = data;

  return (
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
      <StyledStoresList>
        <StyledTitle>All Stores</StyledTitle>
        {storeList.map((store) => (
          <Link to={`/stores/${store.id}`} key={store.id}>
            <StyledLink>
              <StyledMenuIcon>
                {store.icon ? <img src={store.icon} alt="" /> : <CiShop />}
              </StyledMenuIcon>
              <StyledAnchor>{store.name}</StyledAnchor>
            </StyledLink>
          </Link>
        ))}
      </StyledStoresList>
      <StyledSidebarFooter>
        <StyledBottomMenu>
          <Form method="post" action="/logout">
            {/* TODO: add dropdown with logout, theme switching, setting, profile */}
            <StyledLogoutBtn>
              <StyledToolbarItem>
                <CiPower />
                <Text sx={{ fontWeight: "200", fontSize: "0.875rem" }}>
                  Logout
                </Text>
              </StyledToolbarItem>
            </StyledLogoutBtn>
          </Form>
        </StyledBottomMenu>
        <StyledProfileSide>
          <img src={profilePicture} alt="" />
        </StyledProfileSide>
        <StyledNameBox>
          {user.name && <StyledText>{user.name}</StyledText>}
          {user.email && <StyledText disabled>{user.email}</StyledText>}
        </StyledNameBox>
        <StyledMoreBox>
          <CiCircleMore />
        </StyledMoreBox>
      </StyledSidebarFooter>
    </StyledSidebar>
  );
};

export default Sidebar;

// TODO: change all stores to favorites
