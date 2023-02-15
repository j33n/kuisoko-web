import { useLocation } from "@remix-run/react";
import { Link } from "@remix-run/react";
import styled from "@emotion/styled";

import { FlexCenterRow } from "~/styles/page.styled";

import type { StyledTheme } from "../Header/Header.styled";

export const StyledAuthMenu = styled(FlexCenterRow)<StyledTheme>`
  width: 100%;
  color: ${({ theme: { colors } }) => colors.text};
  box-sizing: border-box;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  border-bottom: 1px solid ${({ theme: { colors } }) => colors.gray4};
`;

export const StyledLink = styled(Link)<any>`
  text-align: center;
  font-size: ${({ theme: { fontSizes } }) => fontSizes.sm};
  font-weight: 200;
  padding: 0.5rem 0;
  width: 50%;
  border-bottom: 1px solid transparent;

  ${({ active, theme: { colors } }) =>
    active &&
    `
    border-bottom: 1px solid ${colors.nav};
  `}

  &:hover {
    background-color: ${({ theme: { colors } }) => colors.buttonBgHover};
    color: ${({ theme: { colors } }) => colors.buttonBg};
  }
`;

export const AuthMenu = () => {
  const { pathname } = useLocation();

  const loginPath = "/login";
  const joinPath = "/join";

  return (
    <StyledAuthMenu>
      <StyledLink to={loginPath} active={pathname === loginPath}>
        Login
      </StyledLink>
      <StyledLink to={joinPath} active={pathname === joinPath}>
        Create Account
      </StyledLink>
    </StyledAuthMenu>
  );
};

export default AuthMenu;
