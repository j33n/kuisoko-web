import { useState } from "react";
import { Link } from "@remix-run/react";
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

import { useOptionalUser } from "~/utils";
import { Header, PageHeader } from "../";
import bgImage from "~/assets/images/loginBg.svg";

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
  StyledBgImage,
} from "./Layout.styled";
import { StyledFooterText, StyledFooter } from "~/styles/page.styled";

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

const Layout = ({ children, setCurrentTheme, currentTheme }: ILayout) => {
  const [, setShowModal] = useState(false);

  const handleAdder = () => {
    setShowModal(true);
  };

  const user = useOptionalUser();

  const currentYear: number = new Date().getFullYear();

  return (
    <StyledLayout>
      <StyledBgImage src={bgImage} />
      <Header currentTheme={currentTheme} setCurrentTheme={setCurrentTheme} />
      <StyledContent>
        {user && (
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
        )}
        <StyledBodyContent>
          {user && (
            <PageHeader
              pageName={"Store xxxxx"}
              allowNew
              handleAdder={handleAdder}
            />
          )}
          {children}
        </StyledBodyContent>
        <StyledFooter>
          <StyledFooterText>
            &copy; {currentYear} kuisoko |{" "}
            <Link style={{ fontWeight: 600 }} to="/">
              Term and Conditions
            </Link>
          </StyledFooterText>
        </StyledFooter>
      </StyledContent>
    </StyledLayout>
  );
};

export default Layout;
