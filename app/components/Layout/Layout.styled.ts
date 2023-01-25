import styled from "@emotion/styled";
import type { ColorModesScale } from "theme-ui";

export interface StyledTheme {
  theme?: {
    colors: ColorModesScale;
  };
  disabled?: boolean;
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

export const StyledText = styled.p<StyledTheme>`
  font-size: 0.8rem;
  color: ${({ theme: { colors }, disabled }) =>
    disabled ? colors.textDisabled : colors.text};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  @media only screen and (max-width: 480px) {
    font-size: 3vw;
  }
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

  @media only screen and (max-width: 480px) {
    font-size: 3.8vw;
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
  max-width: ${({ size }) => size || "30vw"};

  /* mobile size */
  @media (max-width: 480px) {
    max-width: ${({ size }) => size || "25vw"};
  }

  /* tablet size */
  @media (max-width: 768px) {
    max-width: ${({ size }) => size || "20vw"};
  }
  /* laptop size */
  @media (min-width: 1024px) {
    max-width: ${({ size }) => size || "30vw"};
  }

  /* desktop size */
  @media (min-width: 1280px) {
    max-width: ${({ size }) => size || "30vw"};
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

export const StyledSidebarFooter = styled(Block)<StyledTheme>`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: 5rem;
  position: relative;
  border-top: ${({ theme: { colors } }) =>
    `1px solid ${colors.buttonBgHover}`};

  @media only screen and (max-width: 768px) {
    align-items: center;
    flex-wrap: wrap;

    div:first-child {
      margin: 4px 0 0 4px;
    }
  }
`;

export const StyledMoreBox = styled.div`
  display: flex;
  order: 3;

  @media only screen and (max-width: 768px) {
    order: 2;
    width: 30%;
  }

  svg {
    width: 2rem;
    height: 2rem;

    /* mobile size */
    @media (max-width: 480px) {
      width: 1.5rem;
      height: 1.5rem;
    }

    /* small mobile size */
    @media (max-width: 320px) {
      display: none;
    }
  }
`;

export const StyledProfileSide = styled.div<StyledTheme>`
  display: flex;
  order: 1;

  /* @media only screen and (max-width: 768px) {
    width: 70%;
  } */

  img {
    max-width: 3rem;
    max-height: 3rem;
    border-radius: 50%;
    padding: 2px;
    border: 1px solid ${({ theme: { colors } }) => colors.border};

    @media only screen and (max-width: 768px) {
      max-width: 2rem;
      max-height: 2rem;
    }
  }
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

    /* mobile size */
    @media (max-width: 480px) {
      width: 1.5rem;
      height: 1.5rem;
    }
  }
`;

export const StyledNameBox = styled.div`
  display: flex;
  flex-direction: column;
  order: 2;
  
  @media only screen and (max-width: 768px) {
    order: 3;
    width: 100%;
    margin-bottom: 2px;
    text-align: center;

    p:last-child {
      display: none;
    }
  };

  @media only screen and (max-width: 480px) {
    font-size: vw;
  }
`;
