import styled from "@emotion/styled";

export const StyledItemBox = styled.div`
  display: flex;
  flex-direction: column;
  /* flex: 25%;
  min-width: calc(200px + 1rem); */
  padding: 0.5rem;
  border-radius: 0.5rem;
  background: ${({ theme: { colors } }) => colors.whiteA5};
  border: 1px solid ${({ theme: { colors } }) => colors.buttonBgHover};
  position: relative;

  @media only screen and (max-width: 426px) {
    flex: 90%;
    max-width: 90%;
  }

  @media only screen and (min-width: 427px) and (max-width: 768px) {
    flex: 45%;
    max-width: 45%;
  }
`;

export const StyledParagraph = styled.p`
  padding: 0.2rem 0;
  font-size: ${({ theme: { fontSizes } }) => fontSizes.xls};
`;

export const StyledPLabel = styled.label`
  font-size: ${({ theme: { fontSizes } }) => fontSizes.xxxs};
  font-weight: ${({ theme: { fontWeights } }) => fontWeights.bold};
  color: ${({ theme: { colors } }) => colors.textDisabled};
`;

export const StyledDDContainer = styled.div`
  position: absolute;
  right: 0.2rem;
  top: 0.2rem;
  z-index: 4;
`;

export const StyledImageView = styled.div`
  display: flex;
  border: 1px solid ${({ theme: { colors } }) => colors.buttonBgHover};
  height: 200px;
  width: 200px;
  border-radius: 0.5rem;
  /* width: 100%; */

  img {
    border-radius: 0.5rem;
  }
`;
