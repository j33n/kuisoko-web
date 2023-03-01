import { css, keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { Box } from "theme-ui";

export const StyledContainer = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const dotSize = 10;
const animationSpeed = 1000;

export const fx = keyframes`
    0% {
      transform: scale(1);
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
`;

export const animation = (delay = 0) => {
  return css`
    animation: ${fx} ${animationSpeed}ms ease infinite ${delay}ms;
  `;
};

export const StyledDot = styled.div`
  width: ${dotSize}px;
  height: ${dotSize}px;
  border: ${dotSize / 5}px solid white;
  border-radius: 50%;
  float: left;
  margin: 0 (${dotSize / 2});
  transform: scale(0);
  ${animation()}

  &:nth-of-type(2) {
    ${animation(animationSpeed * 0.3)};
  }

  &:nth-of-type(3) {
    ${animation(animationSpeed * 0.6)};
  }
`;

const Loader = ({sx}: any) => (
  <StyledContainer sx={sx}>
    <StyledDot />
    <StyledDot />
    <StyledDot />
  </StyledContainer>
);

export default Loader;
