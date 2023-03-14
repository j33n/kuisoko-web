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
    width: 100%;
  }
`;

export const NavButtonStyles = ({ theme: { colors } }: any) => css`
  top: calc(50% - 20px);
  position: absolute;
  display: flex;
  width: 2rem;
  height: 2rem;
  justify-content: center;
  align-items: center;
  border: none;
  background: ${colors.background};
  border-radius: 50%;
  user-select: none;
  cursor: pointer;
  /* font-weight: bold; */
  /* font-size: 18px; */
  z-index: 2;
`;

export const StyledPrevBtn = styled.button`
  ${NavButtonStyles};
  left: 0.5rem;
  transform: scale(-1);
`;

export const StyledNextBtn = styled.button`
  ${NavButtonStyles};
  right: 0.5rem;
`;

// .refresh {
//   padding: 10px;
//   position: absolute;
//   background: rgba(0, 0, 0, 0.4);
//   border-radius: 10px;
//   width: 20px;
//   height: 20px;
//   top: 10px;
//   right: 10px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   cursor: pointer;
// }
