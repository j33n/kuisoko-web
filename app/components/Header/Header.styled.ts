import styled from '@emotion/styled';
import type { ColorModesScale } from "theme-ui";

export interface StyledTheme {
  theme?: {
    colors: ColorModesScale
  };
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

export const StyledToolbarItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const StyledThemeBox = styled.div`
  display: flex;
  flex-direction: row;
`;
