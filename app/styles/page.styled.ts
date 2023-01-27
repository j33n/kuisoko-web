import styled from "@emotion/styled";
import type { ColorModesScale } from "theme-ui";

export interface StyledTheme {
  theme?: {
    colors: ColorModesScale;
  };
  disabled?: boolean;
}

export const StyledPage = styled.div<StyledTheme>`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  position: relative;
  background: ${({ theme: { colors } }) => colors.background};
  color: ${({ theme: { colors } }) => colors.text};
`;
