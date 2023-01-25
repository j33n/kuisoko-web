import styled from '@emotion/styled';
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
    border-bottom: ${({ theme: { colors } }) => `1px solid ${colors.buttonBgHover}`};
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

export const StyledToolbarItem = styled.div<StyledTheme>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-right: 1.5vw;

  svg {
    width: 2rem;
    height: 2rem;
    margin: 0.5rem;
    color: ${({ theme: { colors }, nav }) => (nav ? colors.nav : colors.text)};
    margin: '0 auto';
    transition: 'transform 1000ms ease';
  }
`;

export const StyledIconBox = styled.div<StyledTheme>`
  display: flex;
  flex-direction: row;
  border: 1px solid ${({ theme: { colors } }) => colors.buttonBgHover};
  border-radius: 50%;
  cursor: pointer;
`;
