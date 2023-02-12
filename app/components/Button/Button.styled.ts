import styled from "@emotion/styled";
import { Button, Box } from "theme-ui";
import type { StyledTheme } from "~/styles/page.styled";

export interface StyledButtonProps {
  size?: string;
  theme?: StyledTheme["theme"];
}

export type StyledIconProps = {
  icon?: React.ReactNode;
  theme?: StyledTheme["theme"];
};

export const StyledButton = styled(Button)<StyledButtonProps>`
  min-width: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  background-color: transparent;
  padding: 0.5rem;
  border: 1px solid ${({ theme: { colors } }) => colors.nav};
  color: ${({ theme: { colors } }) => colors.nav};
  font-weight: 600;
  font-size: ${({ theme: { fontSizes } }) => fontSizes.xs};
  position: relative;

  &:hover {
    color: ${({ theme: { colors } }) => colors.white};
    background-color: ${({ theme: { colors } }) => colors.nav};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme: { colors } }) => colors.blue4};
  }

  ${({ disabled, theme: { colors } }) =>
    disabled &&
    `
    cursor: not-allowed;
    background-color: ${colors.nav};
    
    &:hover, &:focus {
      background-color: ${colors.nav};
    }
  `}

  @media (max-width: 425px) {
    width: 100%;
  }
`;

export const StyledIcon = styled(Box)<StyledIconProps>`
  margin-left: 0.5rem;
  color: ${({ theme }) => theme.colors.buttonText};
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;
