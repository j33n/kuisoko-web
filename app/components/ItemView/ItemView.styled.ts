import styled from "@emotion/styled";

export const StyledItemBox = styled.div`
  display: flex;
  flex-direction: column;
  flex: 25%;
  border: 1px solid ${({ theme: { colors } }) => colors.buttonBgHover};
`;

export const EditableP = styled.p`
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme: { colors } }) => colors.blue4};
  }
`;
