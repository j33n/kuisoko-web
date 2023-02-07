import styled from "@emotion/styled";
import { StyledError, StyledInputs } from "./TextInput";
import { useEffect, useState } from "react";
import TextLabel from "./TextLabel";

export const StyledTextArea = styled.textarea`
  ${StyledInputs};
`;

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
`;

export interface ITextArea extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  error?: string | null;
  labelText?: string;
  htmlFor?: string | "";
  required?: boolean;
}

const TextArea = ({
  className,
  error = "",
  onChange = () => {},
  labelText,
  htmlFor,
  required,
  ...restProps
}: ITextArea) => {
  const [errorText, setErrorText] = useState(error);

  useEffect(() => {
    setErrorText(error);
  }, [error]);

  return (
    <StyledContainer className={className}>
      {labelText && <TextLabel htmlFor={htmlFor}>{labelText}</TextLabel>}
      <StyledTextArea
        onChange={(e) => {
          onChange(e);
          setErrorText("");
        }}
        required={required}
        {...restProps}
      />
      {!!errorText && <StyledError id="body-error">{errorText}</StyledError>}
    </StyledContainer>
  );
};

export default TextArea;
