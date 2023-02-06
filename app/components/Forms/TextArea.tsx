import styled from "@emotion/styled";
import { StyledError, StyledInputs } from "./TextInput";

export const StyledTextArea = styled.textarea`
  ${StyledInputs}
`;

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

export interface ITextArea
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  error?: string | null;
}

const TextArea = ({ className, error, ...restProps }: ITextArea) => {
  return (
    <StyledContainer className={className}>
      <StyledTextArea {...restProps} />
      {error && <StyledError id="body-error">{error}</StyledError>}
    </StyledContainer>
  );
};

export default TextArea;
