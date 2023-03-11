import * as rDropdownMenu from "@radix-ui/react-dropdown-menu";

import { AiOutlineMore } from "react-icons/ai";
import { StyledContent, StyledIconButton } from "./DropDownMenu.styled";

import type { ThemeUIStyleObject } from "theme-ui";

export interface IDropDownMenu {
  trigger?: React.ReactNode;
  children: React.ReactNode;
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
  defaultOpen?: boolean;
  modal?: boolean;
  triggerIcon?: React.ReactNode;
  width?: string;
  mini?: boolean;
  sxButton?: ThemeUIStyleObject;
}

const DropDownMenu = ({
  trigger,
  children,
  onOpenChange,
  defaultOpen = false,
  open,
  modal = true,
  triggerIcon = <AiOutlineMore style={{ transform: "rotate(90deg)" }} />,
  width,
  mini,
  sxButton,
}: IDropDownMenu) => {
  return (
    <rDropdownMenu.Root
      onOpenChange={onOpenChange}
      open={open}
      defaultOpen={defaultOpen}
      modal={modal}
    >
      <rDropdownMenu.Trigger asChild>
        {trigger || (
          <StyledIconButton
            aria-label="Customise options"
            mini={mini}
            sx={sxButton}
          >
            {triggerIcon}
          </StyledIconButton>
        )}
      </rDropdownMenu.Trigger>
      <rDropdownMenu.Portal>
        <StyledContent
          sideOffset={5}
          width={width}
        >
          {children}
        </StyledContent>
      </rDropdownMenu.Portal>
    </rDropdownMenu.Root>
  );
};

export default DropDownMenu;
