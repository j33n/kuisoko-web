import React from "react";


import { StyledButton, StyledIcon } from "./Button.styled";

export interface IButton {
  type?: "submit" | "button" | "reset";
  disabled?: boolean;
  children: React.ReactNode;
  width?: string;
  fontWeight?: string;
  icon?: React.ReactNode;
  variant?: "primary" | "secondary" | "disabled" | string;
  sx?: any;
}

export const Button = ({
  type,
  disabled,
  children,
  icon,
  variant,
  sx,
}: IButton) => {
  return (
    <StyledButton
      type={type || "submit"}
      disabled={disabled}
      variant={variant || "primary"}
      sx={{ ...sx }}
    >
      {children}
      {icon && <StyledIcon>{icon}</StyledIcon>}
    </StyledButton>
  );
};

export default Button;
