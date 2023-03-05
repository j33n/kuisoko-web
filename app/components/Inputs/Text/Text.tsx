import { useEffect, useState } from "react";

import { StyledError, StyledInput, StyledInputContainer, StyledLabel } from "./Text.styled";

import type { InputProps} from "theme-ui";

export interface ITextInput extends InputProps {
  htmlFor?: string | "";
  labelText?: string;
  className?: string;
  type?: string | "text";
  name: string;
  id?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  sx?: any;
  error?: string;
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
  type,
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
}: ITextInput) => {
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
      <StyledInput
        type={type}
        name={name}
        onChange={(e) => {
          onChange(e);
          setErrorText("");
        }}
        required={required}
        onFocus={onFocus}
        id={id || name}
        {...restProps}
      />
      {!!errorText && <StyledError id="body-error">{errorText}</StyledError>}
    </StyledInputContainer>
  );
};

export default TextInput;
