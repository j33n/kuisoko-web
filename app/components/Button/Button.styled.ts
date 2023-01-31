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
  border-radius: 0.5rem;
  min-width: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;

  &:focus {
    border: none;
    box-shadow: ${({ theme: { colors } }) => colors.boxShadow};
  }

  @media (max-width: 425px) {
    width: 100%;
  };
`;

export const StyledIcon = styled(Box)<StyledIconProps>`
  margin-left: 0.5rem;
  color: ${({ theme }) => theme.colors.buttonText};
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;
