import styled from "@emotion/styled";
import type { StyledTheme } from "~/styles/page.styled";

export const StyledContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
`;

export const StyledBody = styled.div`
  width: 60vw;
  margin-top: 10vh;
`;

export const StyledContent = styled.div`
  width: 80%;
  margin: 0 auto;
`;

export const StyledSideRight = styled.div<StyledTheme>`
  width: 40%;
  padding-top: 1rem;
  padding-left: 0.5rem;
  border-left: 1px solid ${({ theme: { colors } }) => colors.buttonBgHover};
`;

export const StyledHeader = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

export const StyledLogoBox = styled.div<StyledTheme>`
  display: flex;
  margin-bottom: 1rem;
`;

export const StyledComment = styled.p`
  font-size: 1rem;
  font-weight: 200;
`;

export const StyledOverlay = styled.div<StyledTheme>`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 1;
  background: ${({ theme: { colors } }) => colors.blackA7};
`;