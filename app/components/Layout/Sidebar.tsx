import { Form, Link, useLoaderData, useLocation } from "@remix-run/react";
import {
  CiShop,
  CiPower,
  CiUser,
  CiLogout,
} from "react-icons/ci";
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
  StyledProfilePageLink,
} from "./Sidebar.styled";
import { links } from "./links";
import DropDownMenu from "./DropDownMenu/DropDownMenu";
import {
  StyledIconButton,
  StyledItem,
  StyledRightSlot,
} from "./DropDownMenu/DropDownMenu.styled";
import { AiOutlineEllipsis } from "react-icons/ai";
import { useRef } from "react";

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

export interface IRenderIcon {
  src: string;
}

const Sidebar = () => {
  const data = useLoaderData<typeof loader>();
  const { pathname } = useLocation();
  const logoutBtnRef = useRef<HTMLButtonElement>(null);

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
          {storeList.map((store) => (
            <StyledLinkList to={`/stores/${store.id}`} key={store.id}>
              <StyledAnchorStores>
                {store.icon ? <RenderIcon src={store.icon} /> : <CiShop />}
              </StyledAnchorStores>
              <StyledLinkStores>{store.name}</StyledLinkStores>
            </StyledLinkList>
          ))}
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
        <StyledProfilePageLink to={"/account"}>
          <StyledProfileSide>
            {user.profile ? (
              <img src={user.profile} alt="" />
            ) : (
              <StyledIconButton>
                <CiUser size={24} />
              </StyledIconButton>
            )}
          </StyledProfileSide>
          <StyledNameBox>
            {user.name && <StyledText>{user.name}</StyledText>}
            {user.email && <StyledText disabled>{user.email}</StyledText>}
          </StyledNameBox>
        </StyledProfilePageLink>
        <StyledMoreBox>
          <DropDownMenu triggerIcon={<AiOutlineEllipsis />}>
            <StyledItem onClick={() => logoutBtnRef.current?.click()}>
              Logout
              <StyledRightSlot>
                <CiLogout size={32} />
              </StyledRightSlot>
            </StyledItem>
          </DropDownMenu>
        </StyledMoreBox>
        <form action="/logout" method="post">
          <button type="submit" ref={logoutBtnRef} hidden>
            Logout
          </button>
        </form>
      </StyledSidebarFooter>
    </StyledSidebar>
  );
};

export default Sidebar;
