import { Form, Link, useLoaderData, useLocation } from "@remix-run/react";
import { faker } from "@faker-js/faker";
import { CiShop, CiCircleMore, CiPower } from "react-icons/ci";
import { Text } from "theme-ui";

import useImageColor from "use-image-color";

import {
  StyledLink,
  StyledSidebar,
  StyledSidebarLinks,
  StyledSidebarFooter,
  StyledNameBox,
  StyledText,
  StyledProfileSide,
  StyledMoreBox,
  StyledBottomMenu,
  StyledToolbarItem,
} from "./Layout.styled";
import { StyledLogoutBtn } from "../Header/Header.styled";

import type { loader } from "~/routes/__index";
import {
  StyledImage,
  StyledImageContainer,
  StyledStoresList,
  StyledAnchor,
  StyledMenuLink,
  StyledLinkStores,
  StyledAnchorStores,
  StyledLinkList,
} from "./Sidebar.styled";
import { links } from "./links";

export interface ISidebar {
  user: any;
}

const RenderIcon = ({ src }: IRenderIcon) => {
  const { colors } = useImageColor(src, { cors: true, colors: 5 });

  const bgColor = () => {
    if (colors && colors.length > 0) {
      if (colors[0] === "#040404") {
        return colors[1];
      } else {
        return colors[0];
      }
    }
    return "transparent";
  };

  return (
    <StyledImageContainer bgColor={bgColor()}>
      <StyledImage src={src} alt="icon" />
    </StyledImageContainer>
  );
};

const profilePicture = faker.image.avatar();

export interface IRenderIcon {
  src: string;
}

const Sidebar = () => {
  const data = useLoaderData<typeof loader>();
  const { pathname } = useLocation();

  const { user, storeList } = data;

  return (
    <StyledSidebar>
      <StyledSidebarLinks>
        {links.map((link) => (
          <StyledLink
            active={pathname === link.path}
            to={link.path}
            key={link.name}
          >
            <StyledMenuLink>{link.icon}</StyledMenuLink>
            <StyledAnchor>{link.name}</StyledAnchor>
          </StyledLink>
        ))}
      </StyledSidebarLinks>
      {storeList.length > 0 && (
        <StyledStoresList>
          <>
            {/* <StyledTitle>All Stores</StyledTitle> */}
            {storeList.map((store) => (
              <Link to={`/stores/${store.id}`} key={store.id}>
                <StyledLinkList>
                  <StyledAnchorStores>
                    {store.icon ? <RenderIcon src={store.icon} /> : <CiShop />}
                  </StyledAnchorStores>
                  <StyledLinkStores>{store.name}</StyledLinkStores>
                </StyledLinkList>
              </Link>
            ))}
          </>
        </StyledStoresList>
      )}
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
