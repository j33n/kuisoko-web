import { css } from "@emotion/react";
import styled from "@emotion/styled";

import { Button, Box } from "theme-ui";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

import {
  slideDownAndFade,
  slideLeftAndFade,
  slideRightAndFade,
  slideUpAndFade,
} from "~/components/Modal/Keyframes.styled";

export type StyledContentProps = {
  minWidth?: string;
};

export const DropdownMenuArrow = styled(DropdownMenu.Arrow)`
  fill: white;
`;

export const ItemStyles = ({ theme: { colors } }: any) => css`
  all: unset;
  font-size: 1rem;
  line-height: 1px;
  color: ${colors.text};
  border-radius: 3px;
  display: flex;
  align-items: center;
  height: 2rem;
  padding: 0 5px;
  position: relative;
  padding-left: 25px;
  user-select: none;

  &[data-disabled] {
    color: ${colors.gray11};
    pointer-events: none;
  }

  &[data-highlighted] {
    box-shadow: 0 0 0 2px ${colors.blue5};
  }
`;

export const StyledCheckboxItem = styled(DropdownMenu.CheckboxItem)`
  ${ItemStyles}
`;

export const ContentStyles = ({ theme: { colors }, minWidth }: any) => css`
  background-color: ${colors.background};
  border: 1px solid ${colors.gray4};
  border-radius: 0.5rem;
  padding: 5px;
  box-shadow: 0px 10px 38px -10px rgba(22, 23, 24, 0.35),
    0px 10px 20px -15px rgba(22, 23, 24, 0.2);
  animation-duration: 400ms;
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;

  &[data-state="open"] {
    &[data-side="top"] {
      animation-name: ${slideDownAndFade};
    }

    &[data-side="right"] {
      animation-name: ${slideLeftAndFade};
    }

    &[data-side="bottom"] {
      animation-name: ${slideUpAndFade};
    }

    &[data-side="left"] {
      animation-name: ${slideRightAndFade};
    }
  }
`;

export const StyledContent = styled(DropdownMenu.Content)<StyledContentProps>`
  ${ContentStyles};
  min-width: ${({ minWidth }) => minWidth || "220px"};
`;

export const StyledItem = styled(DropdownMenu.Item)`
  ${ItemStyles};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme: { colors } }) => colors.blue4};
  }
`;

export const StyledItemIndicator = styled(DropdownMenu.ItemIndicator)`
  position: absolute;
  left: 0;
  width: 25px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

export const StyledLabel = styled(DropdownMenu.Label)`
  padding-left: 25px;
  font-size: 12px;
  line-height: 25px;
  color: ${({ theme: { colors } }) => colors.crimson11};
`;

export const StyledRadioItem = styled(DropdownMenu.RadioItem)`
  ${ItemStyles}
`;

export const StyledSeparator = styled(DropdownMenu.Separator)`
  height: 1px;
  background-color: ${({ theme: { colors } }) => colors.gray4};
  margin: 5px;
`;

export const StyledSubContent = styled(DropdownMenu.SubContent)`
  ${ContentStyles};
  min-width: 220px;
`;

export const StyledSubTrigger = styled(DropdownMenu.SubTrigger)`
  &[data-state="open"] {
    background-color: ${({ theme: { colors } }) => colors.crimson4};
    color: ${({ theme: { colors } }) => colors.text};
  }

  ${ItemStyles}
`;

export const IconButton = ({ theme: { colors } }: any) => css`
  all: unset;
  font-family: inherit;
  border-radius: 50%;
  height: 2.5rem;
  width: 2.5rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: ${colors.text};
  background-color: ${colors.background};
  border: 1px solid ${colors.gray4};
  cursor: pointer;

  svg {
    width: 1.5rem;
    height: 1.5rem;
  }

  &:hover {
    background-color: ${colors.blue7};
    border: 1px solid transparent;
  }

  &:focus {
    box-shadow: 0 0 0 2px ${colors.blue5};
  }
`;

export const StyledIconButton = styled(Button)`
  ${IconButton}
`;

export const StyledAbsIconButton = styled(Button)`
  ${IconButton};
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
`;

export const StyledRightSlot = styled(Box)`
  margin-left: auto;
  padding-left: 20px;
  color: ${({ theme: { colors } }) => colors.blue11};

  [data-highlighted] > & {
    color: white;
  }

  [data-disabled] & {
    color: ${({ theme: { colors } }) => colors.crimson11};
  }
`;
