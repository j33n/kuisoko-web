import styled from "@emotion/styled";
import type { ColorModesScale } from "theme-ui";

export interface StyledLayoutProps {
  theme?: {
    colors: ColorModesScale;
  };
}

export const StyledLayout = styled.div<StyledLayoutProps>`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  position: relative;
  background: ${({ theme: { colors } }) => colors.background};
  color: ${({ theme: { colors } }) => colors.text};
`;

export const StyledContent = styled.div`
  display: flex;
`;
