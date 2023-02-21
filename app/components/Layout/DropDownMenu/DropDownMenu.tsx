import * as rDropdownMenu from "@radix-ui/react-dropdown-menu";

import { AiOutlineMenu } from "react-icons/ai";
import {
  StyledContent,
  StyledIconButton,
  StyledItem,
  StyledRightSlot,
} from "./DropDownMenu.styled";

export interface IDropDownMenu {
  trigger?: React.ReactNode;
}

const DropDownMenu = ({ trigger }: IDropDownMenu) => {
  return (
    <rDropdownMenu.Root>
      <rDropdownMenu.Trigger asChild>
          <StyledIconButton aria-label="Customise options">
            {trigger || (<AiOutlineMenu />)}
          </StyledIconButton>
      </rDropdownMenu.Trigger>
      <rDropdownMenu.Portal>
        <StyledContent sideOffset={5}>
          <StyledItem>
            Logout <StyledRightSlot>⌘+T</StyledRightSlot>
          </StyledItem>
        </StyledContent>
      </rDropdownMenu.Portal>
    </rDropdownMenu.Root>
  );
};

export default DropDownMenu;
