import React, { useEffect, useState } from "react";

import type { ChangeEvent, TextareaHTMLAttributes } from "react";

import {
  StyledError,
  StyledInputContainer,
  StyledLabel,
  StyledTextArea,
} from "../Text/Text.styled";

export interface ITextArea extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  htmlFor?: string | "";
  labelText?: string;
  className?: string;
  name: string;
  id?: string;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  sx?: any;
  error?: string | null;
  required?: boolean;
  height?: string;
  horizontal?: boolean;
}

export interface ICustomLabel {
  htmlFor?: string;
  children?: React.ReactNode;
  className?: string;
  sx?: any;
}

export const TextLabel = ({ children, ...props }: ICustomLabel) => {
  return <StyledLabel {...props}>{children}</StyledLabel>;
};

const TextInput = ({
  htmlFor,
  labelText,
  className,
  name,
  onChange = () => {},
  onFocus,
  id,
  height,
  required,
  sx,
  error = "",
  horizontal,
  ...restProps
}: ITextArea) => {
  const [errorText, setErrorText] = useState(error);

  useEffect(() => {
    setErrorText(error);
  }, [error]);

  return (
    <StyledInputContainer
      className={className}
      height={height}
      horizontal={horizontal}
    >
      {labelText && <TextLabel htmlFor={htmlFor}>{labelText}</TextLabel>}
      <StyledTextArea
        name={name}
        onChange={(e: any) => {
          onChange(e);
          setErrorText("");
        }}
        onFocus={onFocus}
        required={required}
        id={id || name}
        {...restProps}
      />
      {!!errorText && <StyledError id="body-error">{errorText}</StyledError>}
    </StyledInputContainer>
  );
};

export default TextInput;
