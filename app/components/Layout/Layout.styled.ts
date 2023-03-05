import styled from "@emotion/styled";
import { Link } from "@remix-run/react";
import { Box, IconButton } from "theme-ui";

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
  font-size: ${({ theme: { fontSizes } }) => fontSizes.xxxs};
  color: ${({ theme: { colors }, disabled }) =>
    disabled ? colors.gray10 : colors.text};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
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
  align-items: center;

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

// sidebar styles
export const StyledSidebar = styled(Block)<StyledLayoutProps>`
  max-width: ${({ size }) => size || "30vw"};
  min-height: calc(100vh - ${headerHeight});
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
  max-width: 70vw;
  height: ${({ noFooter }) =>
    noFooter
      ? `calc(100vh - ${headerHeight})`
      : `calc(100vh - (${headerHeight} + 5rem))`};
  position: relative;
  z-index: 1;

  @media (max-width: 480px) {
    max-width: 80vw;
  }

  @media (max-width: 768px) {
    max-width: 80vw;
  }

  @media (min-width: 1024px) {
    max-width: 75vw;
  }

  @media (min-width: 1280px) {
    max-width: 80vw;
  }
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

// __stores page
export const StyledPage = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  position: relative;
  background: ${({ theme: { colors } }) => colors.background};
  color: ${({ theme: { colors } }) => colors.text};
`;

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

export const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin: 1rem 0;
  /* max-width: 70vw; */
`;

export const StyledPageHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  margin-bottom: 2rem;
`;

export const StyledHeaderTitle = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme: { colors } }) => colors.text};
  margin-left: 1.5rem;
`;

export const StyledIconButton = styled(IconButton)`
  width: auto;
  height: auto;
  padding: 0.2rem 0.5rem;

  svg {
    width: 2rem;
    height: 2rem;
    margin-right: 0.5rem;
  }

  &:hover {
    background-color: ${({ theme: { colors } }) => colors.buttonBgHover};
  }
`;

export const StyledNewStoreLink = styled(Link)`
  height: 100%;
  margin: 0 0.5rem;

  svg {
    margin-right: 0 !important;
  }
`;

export const StyledPinContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  padding-left: 1rem;
  overflow-x: auto;
  gap: 1rem;
`;

export const StyledPin = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  max-height: 3rem;
  border-radius: 0.56rem;
  border: ${({ theme: { colors } }) => `1px solid ${colors.gray6}`};

  &:hover {
    border: ${({ theme: { colors } }) => `1px solid ${colors.text}`};
    background-color: ${({ theme: { colors } }) => colors.buttonBgHover};
  }

  &:focus {
    border: ${({ theme: { colors } }) => `1px solid ${colors.blue4}`};
  }
`;

export const StyledPinImg = styled.div`
  display: flex;
`;

export const StyledPinText = styled.span`
  font-size: ${({ theme: { fontSizes } }) => fontSizes.xls};
  height: 2.5rem;
  line-height: 2.5rem;
  vertical-align: middle;
  padding: 0 0.5rem;
  max-width: 150px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const StyledNewText = styled.span`
  display: block;
  font-size: ${({ theme: { fontSizes } }) => fontSizes.xxxs};
  min-width: 100px;
`;

export const StyledOutletContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  width: 100%;
  overflow-y: auto;
`;
