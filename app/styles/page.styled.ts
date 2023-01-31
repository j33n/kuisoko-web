import styled from "@emotion/styled";
import { Form, Link } from "@remix-run/react";

import { Box, Input, Label } from "theme-ui";

import type { ColorModesScale } from "theme-ui";

export interface StyledTheme {
  theme?: {
    colors: ColorModesScale;
    fontSizes: string[];
  };
  disabled?: boolean;
}

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

export const StyledPage = styled.div<StyledTheme>`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  position: relative;
  background: ${({ theme: { colors } }) => colors.background};
  color: ${({ theme: { colors } }) => colors.text};
`;

export const StyledFormContainer = styled(FlexCenterColumn)<StyledTheme>`
  width: 50%;
  height: 50%;
  background: ${({ theme: { colors } }) => colors.background};
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.buttonBgHover};
  border-radius: 0.5rem;

  @media (max-width: 425px) {
    width: 100%;
    height: 100%;
    border-radius: 0;
  }

  @media (min-width: 425px) {
    width: 70%;
  }

  @media (min-width: 768px) {
    width: 50%;
  }
`;

export const StyledForm = styled(Form)<StyledTheme>`
  width: 100%;
`;

export const StyledInputContainer = styled(Box)`
  display: flex;
  margin: 1rem 0;
`;

export const StyledLabel = styled(Label)<StyledTheme>`
  display: flex;
  font-weight: ${({ theme: { colors } }) => colors.fontWeight};
  color: ${({ theme }) => theme.colors.text};
  max-width: 10rem;
  align-items: center;
  padding: 0 1.2rem;
  font-size: 0.875rem;
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
  font-weight: ${({ theme: { colors } }) => colors.fontWeight};

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
  cursor: pointer;

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

  @media (max-width: 425px) {
    width: 100%;
    height: 100%;
  }

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
  font-weight: ${({ theme: { colors } }) => colors.fontWeight};
  text-align: center;
  color: ${({ theme }) => theme.colors.text};
`;

export const StyledText = styled.span<StyledTheme>`
  color: ${({ theme: { colors } }) => colors.text};
  text-align: center;
  font-size: ${({ theme: { fontSizes } }) => fontSizes[0]};
  font-weight: ${({ theme: { colors } }) => colors.fontWeight};
`;

export const StyledFooter = styled(FlexCenterColumn)<StyledTheme>`
  width: 100%;
  height: 5rem;
  background: transparent;
  text-align: center;
  border-top: ${({ theme: { colors } }) => `1px solid ${colors.buttonBgHover}`};
  background: ${({ theme: { colors } }) => colors.background};
`;

export const StyledFooterText = styled(StyledText)`
  text-align: center;

  @media screen and (max-width: 481px) {
    font-size: ${({ theme: { fontSizes } }) => fontSizes[1]};
    padding: 1rem;
  }

  a {
    color: ${({ theme: { colors } }) => colors && colors.nav};
    text-decoration: none;
  }
`;
