import styled from "@emotion/styled";

export const StyledItemBox = styled.div`
  display: flex;
  flex-direction: column;
  flex: 25%;
  max-width: 25%;
  padding-left: 0.5rem;
  border-radius: 0.5rem;
  background: ${({ theme: { colors } }) => colors.whiteA5};
  border: 1px solid ${({ theme: { colors } }) => colors.buttonBgHover};
`;

export const EditableP = styled.p`
  padding: 0.2rem 0;
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme: { colors } }) => colors.blue4};
  }
`;

export const StyledPLabel = styled.label`
  font-size: ${({ theme: { fontSizes } }) => fontSizes.xxxs};
  font-weight: ${({ theme: { fontWeights } }) => fontWeights.bold};
  color: ${({ theme: { colors } }) => colors.textDisabled};
`;
