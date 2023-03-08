import styled from "@emotion/styled";

import { Text } from "theme-ui";

export const StyledDropDown = styled.div`
  display: flex;
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

export const StyledItemsToolbar = styled.div`
  display: flex;
  width: 100%;
`;

export const StyledRemoveInput = styled.div`
  position: absolute;
  right: -1.75rem;
  background: ${({ theme: { colors } }) => colors.blue4};
  width: auto !important;
  border-radius: 50%;
  cursor: pointer;

  svg {
    padding: 0.2rem;
  }

  &:hover {
    background: ${({ theme: { colors } }) => colors.blue6};
  }
`;

export const StyledCustomInput = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding-bottom: 1rem;
  position: relative;
  align-items: center;

  div {
    width: 100%;
  }
`;

export const StyledEditableLabel = styled.p`
  border: 1px dashed ${({ theme: { colors } }) => colors.gray4};
  padding: 0.5rem;
  font-size: ${({ theme: { fontSizes } }) => fontSizes.xxxs};
  min-width: 50%;
  border-radius: 0.25rem;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme: { colors } }) => colors.blue4};
  }
`;

export const InactiveText = styled(Text)`
  display: flex;
  font-size: ${({ theme: { fontSizes } }) => fontSizes.xxs};
  color: ${({ theme: { colors } }) => colors.textDisabled};
  width: 100%;
  align-items: center;
  justify-content: flex-start;
`;

export const TabHeader = styled.div`
  display: flex;
  flex-direction: row;
  padding: 1rem 0;
`;
