import React from "react";

import * as Tooltip from "@radix-ui/react-tooltip";

import { StyledTooltipArrow, StyledTooltipContent } from "./ToolTip.styled";
import { IoCloseOutline } from "react-icons/io5";
import { StyledAbsIconButton } from "../Layout/DropDownMenu/DropDownMenu.styled";

const TooltipDemo = ({ trigger }: { trigger: string }) => {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <StyledAbsIconButton>
            <IoCloseOutline />
          </StyledAbsIconButton>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <StyledTooltipContent sideOffset={5}>
            Add to library
            <StyledTooltipArrow />
          </StyledTooltipContent>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

export default TooltipDemo;
