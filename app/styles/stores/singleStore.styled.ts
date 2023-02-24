import styled from "@emotion/styled";

import { FlexCenter } from "~/styles/page.styled";

export const StyledContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const StyledBody = styled(FlexCenter)`
  width: 60vw;
  height: fit-content;
  margin-top: 5vh;
  border: 1px solid ${({ theme: { colors } }) => colors.buttonBgHover};
  border-radius: 0.5rem;
  padding-top: 1rem;
`;

export const StyledContent = styled.div`
  width: 100%;
  padding: 0 1rem;
  margin: 0 auto;
  position: relative;

  > button {
    position: absolute;
    top: 0;
    right: 0;
    margin-right: 1rem;
  }
`;

export const StyledSideRight = styled.div`
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

export const StyledLogoBox = styled.div`
  display: flex;
  margin-bottom: 1rem;
`;

export const StyledComment = styled.p`
  font-size: 1rem;
  font-weight: 200;
`;

export const StyledOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 1;
  background: ${({ theme: { colors } }) => colors.blackA7};
`;
