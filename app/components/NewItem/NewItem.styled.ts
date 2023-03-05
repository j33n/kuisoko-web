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
