import { useState } from "react";
import { Link, Outlet } from "@remix-run/react";
import { json } from "@remix-run/node";
import type { LoaderArgs } from "@remix-run/node";
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

import { Header, PageHeader } from "../components";

import {
  StyledLayout,
  StyledContent,
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
} from "../components/Layout/Layout.styled";
import { useOptionalUser } from "~/utils";

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

export async function loader({ request }: LoaderArgs) {
  const url = new URL(request.url);

  const pageName = url.pathname.replace("/", "");
  return json({ pageName });
}

const IndexLayout = ({ children, setCurrentTheme, currentTheme }: ILayout) => {
  const [, setShowModal] = useState(false);

  const handleAdder = () => {
    setShowModal(true);
  };

  const user = useOptionalUser();

  return (
    <StyledLayout>
      <Header
        currentTheme={currentTheme}
        setCurrentTheme={setCurrentTheme}
        authenticated={true}
      />
      <StyledContent sx={{ flexDirection: "row" }}>
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
        <StyledBodyContent>
          {user && (
            <PageHeader
              pageName={"Store xxxxx"}
              allowNew
              handleAdder={handleAdder}
            />
          )}
          <Outlet />
        </StyledBodyContent>
      </StyledContent>
    </StyledLayout>
  );
};

export default IndexLayout;
