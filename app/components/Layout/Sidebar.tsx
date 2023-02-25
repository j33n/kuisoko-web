import { useLocation } from "@remix-run/react";
import { CiUser, CiLogout } from "react-icons/ci";

import {
  StyledLink,
  StyledSidebar,
  StyledSidebarLinks,
  StyledSidebarFooter,
  StyledNameBox,
  StyledText,
  StyledProfileSide,
  StyledMoreBox,
} from "./Layout.styled";

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
import type { Store, User } from "@prisma/client";

export type SideBarProps = {
  user: User,
  storeList: Store[],
};

const Sidebar = ({ user, storeList }: SideBarProps) => {
  const { pathname } = useLocation();
  const logoutBtnRef = useRef<HTMLButtonElement>(null);
  const { t } = useTranslation();

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
      {storeList.length > 0 && (
        <StyledStoresList>
          <StyledTitle>{t("favorites")}</StyledTitle>
          {storeList.map((store: Store) => (
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
        <StyledMoreBox>
          <DropDownMenu triggerIcon={<AiOutlineEllipsis />}>
            <StyledItem onClick={() => logoutBtnRef.current?.click()}>
              {t("logout")}
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
