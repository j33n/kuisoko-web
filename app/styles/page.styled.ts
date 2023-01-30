import styled from "@emotion/styled";
import { Form, Link } from "@remix-run/react";

import { Box, Input, Label } from "theme-ui";

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

export const StyledFormContainer = styled(Box)<StyledTheme>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  width: 40vw;
  height: calc(100vh - (92px + 5rem));
  align-items: center;
`;

export const StyledForm = styled(Form)<StyledTheme>`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.buttonBgHover};
  padding: 1rem;
  border-radius: 0.5rem;
`;

export const StyledInputContainer = styled(Box)`
  display: flex;
  margin: 1rem 0;
`;

export const StyledLabel = styled(Label)<StyledTheme>`
  display: flex;
  font-weight: 200;
  color: ${({ theme }) => theme.colors.text};
  max-width: 10rem;
  align-items: center;
  padding: 0 1.2rem;
`;

export const StyledInputBox = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  margin-bottom: 1rem;
`;

export const StyledInput = styled(Input)<StyledTheme>`
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.buttonBgHover};
  color: ${({ theme }) => theme.colors.text};
  border-radius: 0.25rem;
  flex-grow: 1;
  box-sizing: border-box;
  border: none;
  box-shadow: ${({ theme }) => theme.colors.boxShadow};
  font-weight: 200;

  &:focus {
    outline: none;
    border: none;
    box-shadow: ${({ theme }) => theme.colors.boxShadowFocus};
  }
`;

export const StyledError = styled.span<StyledTheme>`
  position: absolute;
  display: block;
  height: 1.5rem;
  color: ${({ theme }) => theme.colors.red};
  top: 100%;
`;

export const StyledLink = styled(Link)<StyledTheme>`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.nav};
  &:hover {
    color: ${({ theme }) => theme.colors.navHover};
  }
`;

export const StyledButton = styled.button<StyledTheme>`
  width: 100%;
  margin: 1rem 0;
  padding: 0.5rem;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text};
  background-color: transparent;
  border-radius: 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.red};

  &:hover {
    background-color: ${({ theme }) => theme.colors.red};
    color: ${({ theme }) => theme.colors.white};
  }

  &:focus {
    background-color: ${({ theme }) => theme.colors.nav};
  }

  &:disabled {
    background-color: #cbd5e0;
    color: ${({ theme }) => theme.colors.textDisabled};
  }

  &:disabled:hover {
    background-color: #cbd5e0;
    color: #a0aec0;
  }

  &:disabled:focus {
    background-color: #cbd5e0;
    color: #a0aec0;
  }
`;

export const Flex = styled(Box)`
  display: flex;
`;

export const FlexCenter = styled(Flex)`
  align-items: center;
  justify-content: center;
`;

export const FlexCenterColumn = styled(FlexCenter)`
  flex-direction: column;
`;

export const FlexCenterRow = styled(FlexCenter)`
  flex-direction: row;
`;

export const FlexCenterBetween = styled(Flex)`
  align-items: center;
  justify-content: space-between;
`;

export const FlexCenterEnd = styled(Flex)`
  align-items: center;
  justify-content: flex-end;
`;

export const StyledCheckbox = styled(Input)<StyledTheme>`
  width: 1rem;
  height: 1rem;
  color: #4299e1;
  border-color: ${({ theme }) => theme.colors.border};
  border-radius: 0.25rem;

  &:focus {
    box-shadow: ${({ theme }) => theme.colors.boxShadow};
  }
`;

export const StyledNewAccountText = styled.span<StyledTheme>`
  font-size: 0.875rem;
  font-weight: 200;
  text-align: center;
  color: ${({ theme }) => theme.colors.text};
`;
