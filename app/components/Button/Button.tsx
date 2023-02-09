import React from "react";


import { StyledButton, StyledIcon } from "./Button.styled";
import Loader from "../Loader/Loader";
import type { TransitionStates } from "@remix-run/react/dist/transition";

export interface IButton {
  type?: "submit" | "button" | "reset";
  disabled?: boolean;
  children: React.ReactNode;
  width?: string;
  fontWeight?: string;
  icon?: React.ReactNode;
  variant?: "primary" | "secondary" | "disabled" | string;
  sx?: any;
  loading?: string
}

export const Button = ({
  type,
  disabled,
  children,
  icon,
  variant,
  sx,
  loading,
}: IButton) => {
  return (
    <StyledButton
      type={type || "submit"}
      disabled={disabled || loading !== "idle"}
      variant={variant || "primary"}
      sx={{ ...sx }}
    >
      {loading !== "idle" && <Loader />}
      {children}
      {icon && <StyledIcon>{icon}</StyledIcon>}
    </StyledButton>
  );
};

export default Button;
