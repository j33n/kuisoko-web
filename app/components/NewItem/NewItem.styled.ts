import styled from "@emotion/styled";

export const StyledDropDown = styled.div`
  display: flex;
  position: absolute;
  top: 0.5rem;
  right: 4rem;
`;

export const StyledFieldType = styled.div`
  padding: 0.3rem;
  cursor: pointer;
  border-radius: 0.3rem;
  font-size: ${({ theme: { fontSizes } }) => fontSizes.xxxs};

  &:hover {
    background: ${({ theme: { colors } }) => colors.blue7};
  }
`;

export const StyledDropDownHeader = styled.div`
  padding: 0.3rem;
  font-size: ${({ theme: { fontSizes } }) => fontSizes.xxxs};
  color: ${({ theme: { colors } }) => colors.textDisabled};
`;

export const StyledBtnContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;

  button {
    border: none;
    background: ${({ theme: { colors } }) => colors.blue4};
    width: 10vw;

    @media only screen and (max-width: 320px) {
      width: 30vw;
    }

    @media only screen and (min-width: 321px) and (max-width: 768px) {
      width: 25vw;
    }

    &:hover {
      border: none;
      background: ${({ theme: { colors } }) => colors.blue6};
    }
  }
`;