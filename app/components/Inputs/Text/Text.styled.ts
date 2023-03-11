import styled from "@emotion/styled";
import { css } from "@emotion/react";

import { Box, Label, Text } from "theme-ui";

export interface TextInputProps {
  height?: string;
  horizontal?: boolean;
}

export const StyledLabel = styled(Label)`
  display: flex;
  color: ${({ theme: { colors } }) => colors.text};
  max-width: 10rem;
  align-items: flex-start;
  font-size: ${({ theme: { fontSizes } }) => fontSizes.xls};
  padding: 0.5rem 0;
`;

export const StyledInputContainer = styled(Box)<TextInputProps>`
  display: flex;
  flex-direction: ${({ horizontal }) => (horizontal ? "row" : "column")};
  height: ${({ height }) => height || "100%"};
  width: 100%;
`;

export const StyledInputs = ({ theme: { colors, fontSizes } }: any) => css`
  font-size: ${fontSizes.xls};
  padding: 0.5rem;
  border-radius: 0.25rem;
  color: ${colors.text};
  background-color: ${colors.buttonBgHover};
  font-weight: 400;
  border: none;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${colors.blue4};
  }
`;

export const StyledInput = styled.input<TextInputProps>`
  ${StyledInputs}
  box-sizing: border-box;
  width: 100%;
`;

export const StyledError = styled.div<TextInputProps>`
  color: ${({ theme: { colors } }) => colors.error};
  font-size: ${({ theme: { fontSizes } }) => fontSizes.xxxs};
  font-weight: ${({ theme: { fontWeights } }) => fontWeights.bold};
  position: absolute;
  bottom: 0;
  margin-left: ${({ horizontal }) => (horizontal ? "10rem" : "0")};
`;

export const StyledSectionText = styled(Text)`
  display: block;
  font-size: ${({ theme: { fontSizes } }) => fontSizes.xxs};
  color: ${({ theme: { colors } }) => colors.textDisabled};
  width: 100%;
  margin: 0.5rem 0 0.5rem -1rem;
`;

export const StyledTextArea = styled.textarea`
  ${StyledInputs}
  box-sizing: border-box;
  width: 100%;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-bottom: 1rem;
`;
