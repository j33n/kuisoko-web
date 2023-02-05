import styled from "@emotion/styled";
import Label from "./TextLabel";
import type { StyledTheme } from "~/styles/page.styled";
import type { InputProps } from "theme-ui";

export const StyledInputContainer = styled.div<StyledTheme>`
  display: flex;
  flex-direction: column;
`;

export const StyledInput = styled.input<StyledTheme>`
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.buttonBgHover};
  color: #202224;
  border-radius: 0.25rem;
  flex-grow: 1;
  box-sizing: border-box;
  border: none;
  box-shadow: ${({ theme }) => theme.colors.boxShadow};
  font-weight: 400;

  &:focus {
    outline: none;
    border: none;
    box-shadow: rgba(201, 191, 191, 1) 0px 0px 3px 0px,
      rgba(0, 0, 0, 56%) 0px 3px 7px -3px;
  }
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
};

const TextInput = ({
  htmlFor,
  labelText,
  className,
  type,
  name,
  onChange,
  onFocus,
  id,
  ...restProps
}: ITextInput) => {
  return (
    <StyledInputContainer className={className}>
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
