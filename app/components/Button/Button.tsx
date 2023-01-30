import React from "react";
import type { StyledTheme } from "~/styles/page.styled";

import { Box, Button as Btn } from "theme-ui";
import { IconBase } from "react-icons";
import styled from "@emotion/styled";

export interface IButton {
  type?: "submit" | "button" | "reset";
  disabled?: boolean;
  children: React.ReactNode;
  width?: string;
  fontWeight?: string;
  icon?: React.ReactNode;
  variant?: "primary" | "secondary" | "disabled" | string;
}

export interface IButtonProps {
  theme?: StyledTheme["theme"];
}

export type StyledIconProps = {
    icon?: React.ReactNode;
} & IButtonProps;

export const StyledIcon = styled(Box)<StyledIconProps>`
    margin-left: 0.5rem;
    color: ${({ theme }) => theme.colors.buttonText};
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Button = ({
  type,
  disabled,
  width,
  children,
  icon,
  variant,
}: IButton) => {
  return (
    <Btn
      type={type || "submit"}
      disabled={disabled}
      variant={variant || "primary"}
      sx={{
        borderRadius: "1rem",
        minWidth: "5rem",
        fontWeight: "400",
        maxWidth: width || "80%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
      }}
    >
      {children}
      {icon && <StyledIcon>{icon}</StyledIcon>}
    </Btn>
  );
};

export default Button;
