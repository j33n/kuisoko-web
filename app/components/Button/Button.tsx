import React from "react";

import { StyledButton, StyledIcon } from "./Button.styled";
import Loader from "../Loader/Loader";
import type { ButtonProps } from "theme-ui";

export interface IButton extends ButtonProps {
  type?: "submit" | "button" | "reset";
  disabled?: boolean;
  children: React.ReactNode;
  width?: string;
  fontWeight?: string;
  icon?: React.ReactNode;
  variant?: "primary" | "secondary" | "disabled" | string;
  sx?: any;
  loading?: string;
}

export const Button = ({
  type,
  disabled,
  children,
  icon,
  variant,
  sx,
  loading,
  ...restProps
}: IButton) => {
  return (
    <StyledButton
      type={type || "submit"}
      disabled={disabled || loading === "loading" || loading === "submitting"}
      variant={variant || "primary"}
      sx={{ ...sx }}
      {...restProps}
    >
      {(loading === "loading" || loading === "submitting") && <Loader />}
      {(!loading || loading === "idle") && (
        <>
          {children}
          {icon && <StyledIcon>{icon}</StyledIcon>}
        </>
      )}
    </StyledButton>
  );
};

export default Button;
