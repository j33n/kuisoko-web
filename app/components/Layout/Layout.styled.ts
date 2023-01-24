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
  };
}

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
  display: flex;
  flex-direction: row;

  @media only screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

export const StyledAnchor = styled.span<StyledTheme>`
  display: flex;
  margin: 0 1rem;
  border-radius: 0.5rem;
  color: ${({ theme: { colors } }) => colors.text};
  font-weight: 200;
  font-size: 1rem;
  justify-content: center;
  align-items: center;

  @media only screen and (max-width: 320px) {
    font-size: 5vw;
  }

  @media only screen and (min-width: 768px) {
    font-size: 1rem;
  }

  @media only screen and (min-width: 1441px) {
    font-size: 1.2rem;
  }
`;


export const StyledContent = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

export const StyledSidebar = styled(Block)<StyledSidebarProps>`
  max-width: ${({ size }) => size || "30%"};

  /* mobile size */
  @media (min-width: 480px) {
    width: ${({ size }) => size || "25%"};
  }

  /* tablet size */
  @media (min-width: 768px) {
    width: ${({ size }) => size || "30%"};
  }
  /* laptop size */
  @media (min-width: 1024px) {
    width: ${({ size }) => size || "35%"};
  }

  /* desktop size */
  @media (min-width: 1280px) {
    width: ${({ size }) => size || "40%"};
  }


  background: ${({ theme: { colors } }) => colors.background};
  border-right: ${({ theme: { colors } }) =>
    `1px solid ${colors.buttonBgHover}`};
`;

export const StyledSidebarLinks = styled(Block)<StyledTheme>`
  width: 100%;
  height: calc(100vh - (92px + 5rem));
  justify-content: flex-start;
  background: ${({ theme: { colors } }) => colors.background};

  a {
    width: 70%;
    margin: 0.5rem 0 0 0;
    padding: 0.5rem;
    border-radius: 0.5rem;

    &:hover {
      background: ${({ theme: { colors } }) => colors.buttonBgHover};
    }
  }
`;

export const StyledSidebarFooter = styled(Block)`
  width: 100%;
  height: 5rem;
`;

export const StyledBodyContent = styled(Block)`
  width: 100%;
`;

export const StyledMenuIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 2rem;
    height: 2rem;
  }
`;
