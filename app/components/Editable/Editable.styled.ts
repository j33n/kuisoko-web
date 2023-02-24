import { Box, Button, Input, Text } from "theme-ui";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const StyledEditButton = styled(Button)`
  border-radius: 0.5rem;
  min-height: 2rem;
  min-width: 2rem;
  width: 2rem;
  height: 2rem;
  background-color: ${({ theme: { colors } }) => colors.gray4};
  color: ${({ theme: { colors } }) => colors.text};
  cursor: pointer;
  border: 1px solid ${({ theme: { colors } }) => colors.gray7};

  &:hover {
    background-color: ${({ theme: { colors } }) => colors.gray6};
    border: 1px solid ${({ theme: { colors } }) => colors.gray9};
  }
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
