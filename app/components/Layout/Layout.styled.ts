import styled from "@emotion/styled";
import type { ColorModesScale } from "theme-ui";

export interface StyledTheme {
  theme?: {
    colors: ColorModesScale;
  };
}

export interface StyledSidebarProps {
  size?: string;
  theme?: {
    colors: ColorModesScale;
  }
};

export const Block = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const StyledLayout = styled.div<StyledTheme>`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  position: relative;
  background: ${({ theme: { colors } }) => colors.background};
  color: ${({ theme: { colors } }) => colors.text};
`;

export const StyledTitle = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

export const StyledLink = styled.div<StyledTheme>`
  width: 100%;
  padding: 0.5rem 0 0 0;

  a {
    display: block;
    padding: 0.8rem 2rem;
    margin: 0 2rem;
    border-radius: 0.5rem;
    color: ${({ theme: { colors } }) => colors.text};
    font-weight: 200;

    &:hover {
      background: ${({ theme: { colors } }) => colors.buttonBgHover};
    }
  }
`;

export const StyledContent = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

export const StyledSidebar = styled(Block)<StyledSidebarProps>`
  max-width: ${({ size }) => size || "30%"};
  background: ${({ theme: { colors } }) => colors.background};
`;

export const StyledSidebarLinks = styled(Block)<StyledTheme>`
  width: 100%;
  height: calc(100vh - (92px + 5rem));
  justify-content: flex-start;
  background: ${({ theme: { colors } }) => colors.background};
`;

export const StyledSidebarFooter = styled(Block)`
  width: 100%;
  height: 5rem;
`;

export const StyledBodyContent = styled(Block)`
  width: 100%;
`;
