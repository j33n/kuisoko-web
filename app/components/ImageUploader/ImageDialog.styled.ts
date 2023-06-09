import styled from "@emotion/styled";
import * as Tabs from "@radix-ui/react-tabs";
import { Box } from "theme-ui";

export const StyledTabsRoot = styled(Tabs.Root)`
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 10px ${({ theme: { colors } }) => colors.blackA7};
`;

export const StyledTabsList = styled(Tabs.List)`
  flex-shrink: 0;
  display: flex;
  width: fit-content;
  gap: 1rem;
  margin-bottom: 1rem;
`;

export const StyledTabsTrigger = styled(Tabs.Trigger)`
  all: unset;
  background-color: ${({ theme: { colors } }) => colors.background};
  color: ${({ theme: { colors } }) => colors.blueA4};
  padding: 0 1rem;
  height: 2.5rem;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme: { fontSizes } }) => fontSizes.xxs};
  user-select: none;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  white-space: nowrap;

  &:hover,
  &[data-state="active"] {
    color: ${({ theme: { colors } }) => colors.text};
    border-bottom: 2px solid ${({ theme: { colors } }) => colors.blue7};
  }

  &[data-disabled] {
    color: ${({ theme: { colors } }) => colors.textDisabled};
    border-bottom: 2px solid transparent;
  }

  &:focus {
    outline: none;
    border-bottom: 2px solid ${({ theme: { colors } }) => colors.blue7};
  }
`;

export const StyledTabsContent = styled(Tabs.Content)`
  flex-grow: 1;
  background-color: ${({ theme: { colors } }) => colors.background};
  outline: none;
  /* padding: 1rem 0; */

  &:focus {
    box-shadow: 0 0 0 2px ${({ theme: { colors } }) => colors.blue4};
  }
`;

export const StyledIcon = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 0.2rem;

  svg {
    font-size: 2rem;
  }

  &:hover {
    background-color: ${({ theme: { colors } }) => colors.buttonBgHover};
  }
`;

export const StyledText = styled.span`
  display: block;
  font-size: ${({ theme: { fontSizes } }) => fontSizes.xls};
  margin-left: 1rem;
`;

export const StyledImagePlaceholder = styled.img`
  display: block;
  width: 5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.5rem;

  &:hover {
    background-color: ${({ theme: { colors } }) => colors.buttonBgHover};
  }
`;