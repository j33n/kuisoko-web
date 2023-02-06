import styled from "@emotion/styled";
import { css } from "@emotion/react";

import Label from "./TextLabel";

import type { StyledTheme } from "~/styles/page.styled";
import type { InputProps } from "theme-ui";
import { useEffect, useState } from "react";

export interface ITextInput extends StyledTheme {
  height?: string;
}

export const StyledInputContainer = styled.div<ITextInput>`
  height: ${({ height }) => height || "100%"};
  position: relative;
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

export const StyledError = styled.div<ITextInput>`
  color: ${({ theme: { colors } }) => colors.error};
  font-size: 0.875rem;
  position: absolute;
  bottom: -0.25rem;
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
  error?: string;
}

const TextInput = ({
  htmlFor,
  labelText,
  className,
  type,
  name,
  onChange = () => {},
  onFocus,
  id,
  height,
  sx,
  error = "",
  ...restProps
}: ITextInput) => {
  const [errorText, setErrorText] = useState(error);

  useEffect(() => {
    setErrorText(error);
  }, [error]);
  
  return (
    <StyledInputContainer className={className} height={height} sx={sx}>
      {labelText && <Label htmlFor={htmlFor}>{labelText}</Label>}
      <StyledInput
        type={type}
        name={name}
        onChange={(e) => {
          onChange(e);
          setErrorText("");
        }}
        onFocus={onFocus}
        id={id || name}
        {...restProps}
      />
      {!!errorText && <StyledError id="body-error">{errorText}</StyledError>}
    </StyledInputContainer>
  );
};

export default TextInput;
