import { Form, Link } from "@remix-run/react";
import { faker } from "@faker-js/faker";
import {
  CiShoppingCart,
  CiShop,
  CiSettings,
  CiUser,
  CiCoinInsert,
  CiGrid42,
  CiCircleMore,
  CiPower,
} from "react-icons/ci";


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
import { Text } from "theme-ui";

export interface ILayout {
  children: React.ReactNode;
  setCurrentTheme: (theme: string) => void;
  currentTheme: string;
}

const name = faker.name.fullName();
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
const email = faker.internet.email();
const profilePicture = faker.image.avatar();

const Sidebar = () => {
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
      <StyledSidebarFooter>
        <StyledBottomMenu>
          <Form method="post" action="/logout">
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
          <StyledText>{name}</StyledText>
          <StyledText disabled>{email}</StyledText>
        </StyledNameBox>
        <StyledMoreBox>
          <CiCircleMore />
        </StyledMoreBox>
      </StyledSidebarFooter>
    </StyledSidebar>
  );
};

export default Sidebar;
