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
} from "./Layout.styled";

export interface ILayout {
  children: React.ReactNode;
  setCurrentTheme: (theme: string) => void;
  currentTheme: string;
}

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
