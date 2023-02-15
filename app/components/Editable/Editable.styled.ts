import { Box, Input, Text } from "theme-ui";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

import type { StyledTheme } from "~/styles/page.styled";

export const StyledEditButton = styled(Box)<StyledTheme>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.5rem;
  min-width: 32px;
  height: 2rem;
  background-color: ${({ theme: { colors } }) => colors.gray4};
  color: ${({ theme: { colors } }) => colors.text};
  cursor: pointer;
`;

export const StyledEditableContent = styled(Box)`
  display: flex;
  flex-direction: row;
`;

export const StyledEditable = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
`;

export const StyledText = ({
  theme: { fontSizes, colors },
  fontSize,
}: any) => css`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: ${fontSizes[fontSize]};
  color: ${colors.text};
  gap: 0.5rem;
`;

export const StyledEditablePreview = styled(Text)<any>`
  ${StyledText}
  height: 2rem;
`;

export const StyledEditableInput = styled(Input)<any>`
  ${StyledText}
  border: none;
  border-bottom: 1px dashed ${({ theme: { colors } }) => colors.gray4};
  max-width: 200px;

  &:focus {
    outline: none;
  }
`;
