import styled from "@emotion/styled";
import * as Tabs from "@radix-ui/react-tabs";

import type { StyledTheme } from "~/styles/page.styled";

export const StyledTabsRoot = styled(Tabs.Root)<StyledTheme>`
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 10px ${({ theme: { colors } }) => colors.blackA7};
`;

export const StyledTabsList = styled(Tabs.List)<StyledTheme>`
  flex-shrink: 0;
  display: flex;
  border-bottom: 1px solid ${({ theme: { colors } }) => colors.blackA4};
`;

export const StyledTabsTrigger = styled(Tabs.Trigger)<StyledTheme>`
  all: unset;
  background-color: ${({ theme: { colors } }) => colors.whiteA12};
  padding: 0 20px;
  height: 45px;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme: { fontSizes } }) => fontSizes[1]};
  color: ${({ theme: { colors } }) => colors.crimson9};
  user-select: none;
  cursor: pointer;

  &:hover: {
    color: ${({ theme: { colors } }) => colors.crimson11};
  }

  &[data-state=active]: {
    color: ${({ theme: { colors } }) => colors.crimson11};
    box-shadow: inset 0 -1px 0 0 red, 0 1px 0 0 red;
  }

  &:focus: {
    position: relative;
    box-shadow: 0 0 0 2px black;
  }
`;

export const StyledTabsContent = styled(Tabs.Content)<StyledTheme>`
  flex-grow: 1;
  background-color: white;
  outline: none;
  &:focus: {
    box-shadow: 0 0 0 2px black;
  }
`;

export const StyledIcon = styled.div<StyledTheme>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0.2rem 0.5rem;
  border-radius: 0.2rem;

  svg {
    font-size: 2rem;
  }

  &:hover {
    background-color: ${({ theme: { colors } }) => colors.buttonBgHover};
  }
`;

export const StyledText = styled.span<StyledTheme>`
  display: block;
  font-size: ${({ theme: { fontSizes } }) => fontSizes[0]};
  margin-left: 1rem;
`;

export const StyledImagePlaceholder = styled.img<StyledTheme>`
  display: block;
  width: 5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.5rem;

  &:hover {
    background-color: ${({ theme: { colors } }) => colors.buttonBgHover};
  }
`;