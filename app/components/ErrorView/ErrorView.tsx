import styled from "@emotion/styled";
import { StyledPLabel } from "../ItemView/ItemView.styled";

export const StyledErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: #c51244;
  border-radius: 0.5rem;
  padding: 1rem;
  color: ${({ theme: { colors } }) => colors.white};
  width: 50%;
  margin: auto;
  max-height: 500px;
  overflow-y: auto;

  label {
    color: ${({ theme: { colors } }) => colors.whiteA10};
  }

  span {
    max-width: 100%;
    display: block;
    font-size: ${({ theme: { fontSizes } }) => fontSizes.xxs};
    white-space: pre;
  }
`;

const ErrorView = ({ error }: { error: Error }) => {
  return (
    <StyledErrorContainer>
      <StyledPLabel>Message:</StyledPLabel>
      <span>{error.message}</span>
      <StyledPLabel>Error Type:</StyledPLabel>
      <span>{error.name}</span>
      <StyledPLabel>Stack:</StyledPLabel>
      <span>{error.stack}</span>
    </StyledErrorContainer>
  );
};

export default ErrorView;
