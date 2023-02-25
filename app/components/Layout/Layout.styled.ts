import styled from "@emotion/styled";
import { Link } from "@remix-run/react";
import { Box } from "theme-ui";

import { FlexCenter } from "~/styles/page.styled";

export const headerHeight = "93px";

export interface StyledLayoutProps {
  size?: string;
  nav?: boolean;
}

export interface IStyledLink {
  active?: boolean;
}

export type StyledTextProps = {
  disabled?: boolean;
};

export const Block = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const StyledText = styled.p<StyledTextProps>`
  font-size: 0.8rem;
  color: ${({ theme: { colors }, disabled }) =>
    disabled ? colors.gray10 : colors.text};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  @media only screen and (max-width: 480px) {
    font-size: 0.75rem;
  }
`;

export const StyledLayout = styled(Box)`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  position: relative;
  color: ${({ theme: { colors } }) => colors.text};
`;

export const StyledBgImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: -1;
`;

export const StyledTitle = styled.h1`
  font-size: 1.2rem;
  text-align: center;
  color: palevioletred;
`;

export const StyledLink = styled(Link)<IStyledLink>`
  width: 100%;
  display: flex;
  flex-direction: row;
  width: 70%;
  margin: 0.5rem 0 0 0;
  padding: 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;

  ${({ active, theme: { colors } }) =>
    active && `background: ${colors.buttonBgHover};`}

  @media only screen and (max-width: 768px) {
    flex-direction: column;
  }

  &:hover {
    background: ${({ theme: { colors } }) => colors.buttonBgHover};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme: { colors } }) => colors.blue5};
  }
`;

export const StyledContent = styled(Box)`
  display: flex;
  width: 100%;
  position: relative;
`;

export const StyledToolbarItem = styled.div<StyledLayoutProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 0;
  margin-right: 1.5vw;

  svg {
    width: 2rem;
    height: 2rem;
    margin: 0.5rem;
    color: ${({ theme: { colors }, nav }) =>
      nav ? colors.navSecondary : colors.text};
    transition: transform 1000ms ease;
  }
`;

export const StyledSidebar = styled(Block)<StyledLayoutProps>`
  max-width: ${({ size }) => size || "30vw"};
  height: calc(100vh - ${headerHeight});
  justify-content: space-between;

  /* mobile size */
  @media (max-width: 480px) {
    max-width: ${({ size }) => size || "20vw"};
  }

  /* tablet size */
  @media (max-width: 768px) {
    max-width: ${({ size }) => size || "20vw"};
  }
  /* laptop size */
  @media (min-width: 1024px) {
    max-width: ${({ size }) => size || "25vw"};
  }

  /* desktop size */
  @media (min-width: 1280px) {
    max-width: ${({ size }) => size || "20vw"};
  }

  background: ${({ theme: { colors } }) => colors.background};
  border-right: ${({ theme: { colors } }) =>
    `1px solid ${colors.buttonBgHover}`};
`;

export const StyledBodyContent = styled(Block)<{ noFooter?: boolean }>`
  max-width: 80%;
  height: ${({ noFooter }) =>
    noFooter ? `calc(100vh - ${headerHeight})` : `calc(100vh - (${headerHeight} + 5rem))`};
  position: relative;
  z-index: 1;
`;

export const StyledSidebarLinks = styled(Block)`
  width: 100%;
  justify-content: flex-start;
  background: ${({ theme: { colors } }) => colors.background};
  overflow: auto;
  padding-bottom: 0.5rem;
`;

export const StyledSidebarFooter = styled(Block)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 4rem;
  position: relative;
  border-top: 1px solid ${({ theme: { colors } }) => colors.buttonBgHover};

  @media only screen and (max-width: 768px) {
    align-items: center;
    flex-wrap: wrap;

    /* div:first-of-type {
      margin: 4px 0 0 4px;
    } */
  }
`;

export const StyledMoreBox = styled(FlexCenter)`
  width: 20%;
  height: 100%;
  order: 3;
  cursor: pointer;

  &:hover {
    background: ${({ theme: { colors } }) => colors.buttonBgHover};
  }

  @media only screen and (max-width: 768px) {
    order: 2;
    width: 45%;
  }

  svg {
    width: 2rem;
    height: 2rem;

    @media (max-width: 480px) {
      width: 1.5rem;
      height: 1.5rem;
    }

    @media (max-width: 320px) {
      display: none;
    }
  }
`;

export const StyledProfileSide = styled(Box)`
  display: flex;
  order: 1;
  min-width: 3.5rem;

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

export const StyledNameBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 0.5rem;
  max-width: 12vw;
  order: 2;

  @media only screen and (max-width: 768px) {
    order: 3;
    width: 100%;
    margin-bottom: 2px;
    text-align: center;
    display: none;
  }
`;

export const StyledBottomMenu = styled.div`
  width: 100%;
  position: absolute;
  bottom: 5rem;
  border-top: ${({ theme: { colors } }) => `1px solid ${colors.buttonBgHover}`};
  margin: 0;
  height: 0;
  visibility: hidden;
`;
