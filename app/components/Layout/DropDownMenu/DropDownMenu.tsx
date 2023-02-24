import * as rDropdownMenu from "@radix-ui/react-dropdown-menu";

import { AiOutlineMore } from "react-icons/ai";
import { StyledContent, StyledIconButton, StyledItem } from "./DropDownMenu.styled";

export interface IDropDownMenu {
  trigger?: React.ReactNode;
  children: React.ReactNode;
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
  defaultOpen?: boolean;
  modal?: boolean;
  triggerIcon?: React.ReactNode;
}

const DropDownMenu = ({
  trigger,
  children,
  onOpenChange,
  defaultOpen = false,
  open,
  modal = true,
  triggerIcon = <AiOutlineMore />,
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
          <StyledIconButton aria-label="Customise options">
            {triggerIcon}
          </StyledIconButton>
        )}
      </rDropdownMenu.Trigger>
      <rDropdownMenu.Portal>
        <StyledContent sideOffset={5}>
          {children}
          <StyledItem>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
          </StyledItem>
        </StyledContent>
      </rDropdownMenu.Portal>
    </rDropdownMenu.Root>
  );
};

export default DropDownMenu;
