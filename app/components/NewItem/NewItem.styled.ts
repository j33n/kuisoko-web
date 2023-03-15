import styled from "@emotion/styled";
import * as Tabs from "@radix-ui/react-tabs";
import { Text } from "theme-ui";

import { StyledFocus } from "../Button/Button.styled";

export type StyledBtnContainerProps = {
  disabled?: boolean;
};

export const StyledDropDown = styled.div`
  display: flex;
  top: 0.5rem;
  right: 4rem;
`;

export const StyledFieldType = styled.button`
  all: unset;
  width: 100%;
  width: -moz-available;
  width: -webkit-fill-available;
  width: fill-available;
  padding: 0.3rem;
  cursor: pointer;
  border-radius: 0.3rem;
  font-size: ${({ theme: { fontSizes } }) => fontSizes.xxxs};

  ${StyledFocus};

  &:hover {
    background: ${({ theme: { colors } }) => colors.blue7};
  }
`;

export const StyledDropDownHeader = styled.div`
  padding: 0.3rem;
  font-size: ${({ theme: { fontSizes } }) => fontSizes.xxxs};
  color: ${({ theme: { colors } }) => colors.textDisabled};
`;

export const StyledBtnContainer = styled.div<StyledBtnContainerProps>`
  display: flex;
  width: 100%;
  justify-content: flex-end;

  button {
    border: none;
    background: ${({ theme: { colors }, disabled }) =>
      disabled ? colors.gray4 : colors.blue4};
    width: auto;
    min-height: 2rem;
    padding: 0 1rem;
    font-size: ${({ theme: { fontSizes } }) => fontSizes.xxs};
    cursor: ${({ disabled }) => disabled ? "not-allowed" : "pointer"};

    &:hover {
      border: none;
      background: ${({ theme: { colors }, disabled }) =>
        disabled ? colors.gray4 : colors.blue7};
    }
  }
`;

export const StyledItemsToolbar = styled.div`
  display: flex;
  width: 100%;
`;

export const StyledRemoveInput = styled.button`
  all: unset;
  right: 0;
  background: transparent;
  width: 1.4rem;
  height: 1.4rem;
  padding: 0;
  border-radius: 50%;
  cursor: pointer;
  border: 1px solid ${({ theme: { colors } }) => colors.buttonBgHover};

  svg {
    padding: 0.2rem;
  }

  ${StyledFocus};

  &:hover {
    border: 1px solid transparent;
    background: ${({ theme: { colors } }) => colors.blue7};
  }
`;

export const StyledCustomInput = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding-bottom: 1rem;
  position: relative;
  align-items: center;
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

export const StyledButtonContent = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const StyledTabHeader = styled.div`
  display: flex;
  flex-direction: row;
  padding-bottom: 1rem;
`;

export const StyledTabsContent = styled(Tabs.Content)`
  margin-top: 2px;

  &:focus,
  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme: { colors } }) => colors.blue4};
  }
`;
