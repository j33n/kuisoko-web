import styled from "@emotion/styled";
import type { ColorModesScale } from "theme-ui";

export interface StyledTheme {
  theme?: {
    colors: ColorModesScale;
  };
  nav?: boolean;
}

export const StyledHeader = styled.header<StyledTheme>`
  display: flex;
  width: 100%;
  border-bottom: ${({ theme: { colors } }) =>
    `1px solid ${colors.buttonBgHover}`};
  background: ${({ theme: { colors } }) => colors.background};
`;

export const StyledLogoBox = styled.div`
  display: flex;
  padding: 1rem 2rem;

  img {
    max-width: 60px;
  }
`;

export const StyledToolbarSpacer = styled.div`
  display: flex;
  width: 100%;
`;

export const StyledToolbarGroup = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const StyledLogoutBtn = styled.button`
  border: none;
  background: none;
  width: 100%;

  &:hover {
    background: none;
    border: none;
  }
`;

export const StyledIconBox = styled.div<StyledTheme>`
  display: flex;
  flex-direction: row;
  border: 1px solid ${({ theme: { colors } }) => colors.buttonBgHover};
  border-radius: 50%;
  cursor: pointer;
`;
