import styled from "@emotion/styled";
import { css } from "@emotion/react";

import Label from "./TextLabel";

import type { StyledTheme } from "~/styles/page.styled";
import type { InputProps } from "theme-ui";

export interface ITextInput extends StyledTheme {
  height?: string;
}

export const StyledInputContainer = styled.div<ITextInput>`
  height: ${({ height }) => height || "100%"};
`;

export const StyledInputs = ({ theme: { colors } }: any) => css`
  font-size: 16px;
  padding: 0.5rem;
  border-radius: 0.25rem;
  margin-bottom: 1rem;
  color: ${colors.text};
  background-color: ${colors.buttonBgHover};
  font-weight: 400;
  border: none;
  width: 100%;
  box-shadow: inset 0 0 0 1px ${colors.buttonBgHover};

  &:focus {
    outline: none;
    box-shadow: inset 0 0 0 1px ${colors.nav};
  }
`;

export const StyledInput = styled.input<ITextInput>`
  ${StyledInputs}
  box-sizing: border-box;
`;

export interface ITextInput extends InputProps {
  htmlFor?: string | "";
  labelText?: string;
  className?: string;
  type?: string | "text";
  name?: string;
  id?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  sx?: any;
}

const TextInput = ({
  htmlFor,
  labelText,
  className,
  type,
  name,
  onChange,
  onFocus,
  id,
  height,
  sx,
  ...restProps
}: ITextInput) => {
  return (
    <StyledInputContainer className={className} height={height} sx={sx}>
      {labelText && <Label htmlFor={htmlFor}>{labelText}</Label>}
      <StyledInput
        type={type}
        name={name}
        onChange={onChange}
        onFocus={onFocus}
        id={id || name}
        {...restProps}
      />
    </StyledInputContainer>
  );
};

export default TextInput;
