import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Box } from "theme-ui";

export const StyledSliderContainer = styled(Box)`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    position: absolute;
    height: 100%;
    /* width: 100%; */
  }
`;

export const NavButtonStyles = ({ theme: { colors } }: any) => css`
  top: calc(50% - 0.75rem);
  position: absolute;
  display: flex;
  width: 1.5rem;
  height: 1.5rem;
  justify-content: center;
  align-items: center;
  border: none;
  background: ${colors.background};
  border-radius: 50%;
  user-select: none;
  cursor: pointer;
  z-index: 2;
`;

export const StyledPrevBtn = styled.button`
  ${NavButtonStyles};
  left: 0.5rem;
`;

export const StyledNextBtn = styled.button`
  ${NavButtonStyles};
  right: 0.5rem;
`;
