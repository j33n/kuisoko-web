import { Link, useLocation } from "@remix-run/react";
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
import { links } from "../../data/links";
import DropDownMenu from "./DropDownMenu/DropDownMenu";
import {
  StyledIconButton,
  StyledItem,
  StyledRightSlot,
} from "./DropDownMenu/DropDownMenu.styled";
import { AiOutlineEllipsis } from "react-icons/ai";
import { HiOutlinePlus } from "react-icons/hi";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { RenderIcon } from "~/components";
import type { Store, User } from "@prisma/client";
import styled from "@emotion/styled";

export type SideBarProps = {
  user: User;
  storeList: Store[];
};

export const StyledIconLink = styled(Link)`
  display: flex;
  margin-left: auto;
  align-items: center;
  justify-content: center;
  height: 1rem;
  padding: 0.2rem;
  border-radius: 50%;
  background: ${({ theme: { colors } }) => colors.background};
  width: 1rem;
  margin: auto;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme: { colors } }) => colors.blue4};
  }
`;

const Sidebar = ({ user, storeList }: SideBarProps) => {
  const { pathname } = useLocation();
  const logoutBtnRef = useRef<HTMLButtonElement>(null);
  const [linkHovered, setLinkHovered] = useState("");
  const { t } = useTranslation();

  return (
    <StyledSidebar>
      <StyledSidebarLinks>
        {links.map((link) => (
          <StyledLink
            active={pathname === link.path}
            to={link.path}
            key={link.name}
            onMouseOver={() => setLinkHovered(link.path)}
            onMouseOut={() => setLinkHovered("")}
          >
            <StyledMenuLink>{link.icon}</StyledMenuLink>
            <StyledAnchor>{t(link.name)}</StyledAnchor>
            {link.menu && linkHovered === link.path && (
              <StyledIconLink to={`${link.path}/new`}>
                <HiOutlinePlus />
              </StyledIconLink>
            )}
          </StyledLink>
        ))}
      </StyledSidebarLinks>
      {storeList.length > 0 && (
        <StyledStoresList>
          <StyledTitle>{t("favorites")}</StyledTitle>
          {storeList.map((store: Store) => (
            <StyledLinkList
              to={`/stores/${store.id}`}
              key={store.id}
            >
              <StyledAnchorStores>
                <RenderIcon src={store.icon} />
              </StyledAnchorStores>
              <StyledLinkStores>{store.name}</StyledLinkStores>
              <StyledIconLink to={`/stores/${store.id}/items/new`} style={{visibility: "hidden"}}>
                <HiOutlinePlus />
              </StyledIconLink>
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
            {user.names && <StyledText>{user.names}</StyledText>}
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
