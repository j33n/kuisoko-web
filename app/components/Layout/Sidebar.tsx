import { Form, useLocation, useMatches } from "@remix-run/react";
import { CiShop, CiPower, CiUser, CiLogout } from "react-icons/ci";
import { Text } from "theme-ui";

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

import {
  StyledStoresList,
  StyledAnchor,
  StyledMenuLink,
  StyledLinkStores,
  StyledAnchorStores,
  StyledLinkList,
  StyledProfilePageLink,
  StyledTitle,
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
import { useTranslation } from "react-i18next";
import { RenderIcon } from "~/components";
import type { Store } from "@prisma/client";

export interface ISidebar {
  user: any;
}

const Sidebar = () => {
  const path = "/stores";
  const matches = useMatches();
  const data = matches.find((m) => m.pathname === path)?.data;

  const { pathname } = useLocation();
  const logoutBtnRef = useRef<HTMLButtonElement>(null);
  const { t } = useTranslation();

  // BUG: this is not working on some pages 
  const { user, favoriteStoreList } = data;

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
            <StyledAnchor>{t(link.name)}</StyledAnchor>
          </StyledLink>
        ))}
      </StyledSidebarLinks>
      {favoriteStoreList.length > 0 && (
        <StyledStoresList>
          <StyledTitle>{t("favorites")}</StyledTitle>
          {favoriteStoreList.map((store: Store) => (
            <StyledLinkList to={`/stores/${store.id}`} key={store.id}>
              <StyledAnchorStores>
                <RenderIcon src={store.icon} />
              </StyledAnchorStores>
              <StyledLinkStores>{store.name}</StyledLinkStores>
            </StyledLinkList>
          ))}
        </StyledStoresList>
      )}
      <StyledSidebarFooter>
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
          <button type="submit" name="logout" ref={logoutBtnRef} hidden>
            Logout
          </button>
        </form>
      </StyledSidebarFooter>
    </StyledSidebar>
  );
};

export default Sidebar;
