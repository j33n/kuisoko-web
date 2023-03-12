import styled from "@emotion/styled";
import { Form, Link } from "@remix-run/react";

import { Box } from "theme-ui";

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

export const FlexCenterStart = styled(Flex)`
  align-items: center;
  justify-content: flex-start;
`;

export const StyledFormContainer = styled(FlexCenterColumn)`
  width: 50%;
  min-height: 50%;
  background: ${({ theme: { colors } }) => colors.background};
  border: 1px solid ${({ theme }) => theme.colors.buttonBgHover};
  border-radius: 0.5rem;
  overflow: auto;

  @media (max-width: 425px) {
    width: 100%;
    height: 100%;
    border-radius: 0;
  }

  @media (min-width: 426px) {
    width: 70%;
  }

  @media (min-width: 768px) {
    width: 50%;
  }
`;

export const StyledForm = styled(Form)`
  width: 100%;
`;

export const StyledItemLink = styled(Link)`
  all: unset;
  display: contents;
`;

export const StyledInputContainer = styled(Box)`
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    flex-direction: column;
    margin: 0;
    margin-bottom: 1rem;
  }
`;

export const StyledInputBox = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  margin-bottom: 2rem;
`;

export const StyledFormBottom = styled(FlexCenterBetween)`
  width: 100%;
  margin-top: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const StyledError = styled.span`
  position: absolute;
  display: block;
  height: 1.5rem;
  color: ${({ theme }) => theme.colors.red};
  top: 100%;
  font-size: ${({ theme }) => theme.fontSizes.xxxs};
`;

export const StyledLink = styled(Link)`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.nav};
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.navHover};
  }
`;

export const StyledButton = styled.button`
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

export const StyledNewAccountText = styled.span`
  font-size: 0.875rem;
  font-weight: ${({ theme: { colors } }) => colors.fontWeight};
  text-align: center;
  color: ${({ theme }) => theme.colors.text};
  height: 40px;
`;

export const StyledText = styled.span`
  color: ${({ theme: { colors } }) => colors.text};
  text-align: center;
  font-size: ${({ theme: { fontSizes } }) => fontSizes.xxxs};
  font-weight: ${({ theme: { colors } }) => colors.fontWeight};
`;

export const StyledFooter = styled(FlexCenterColumn)`
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
    font-size: ${({ theme: { fontSizes } }) => fontSizes.xs};
    padding: 1rem;
  }

  a {
    color: ${({ theme: { colors } }) => colors && colors.nav};
    text-decoration: none;
  }
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;
