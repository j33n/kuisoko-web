import React, { useEffect } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { Box } from "theme-ui";
import * as rDialog from "@radix-ui/react-dialog";

import { Button } from "~/components";
import {
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogTitle,
} from "./Dialog.styled";
import { StyledAbsIconButton } from "../Layout/DropDownMenu/DropDownMenu.styled";

export interface IDialog {
  trigger: React.ReactNode;
  title?: string | null;
  description?: string;
  closeable?: boolean;
  children?: React.ReactNode;
  buttonText?: string;
  allowButton?: boolean;
  sxContent?: any;
  open?: boolean;
  onClose?: () => void;
}

export const Dialog = ({
  trigger,
  title,
  description,
  closeable = true,
  children,
  buttonText,
  sxContent,
  allowButton = false,
  onClose,
  open,
}: IDialog) => {
  const [isOpen, setIsOpen] = React.useState(open);

  useEffect(() => {
    setIsOpen(open);
  }, [onClose, open]);

  return (
    <rDialog.Root open={isOpen}>
      <rDialog.Trigger asChild>{trigger}</rDialog.Trigger>
      <rDialog.Portal>
        <DialogOverlay />
        <DialogContent style={sxContent}>
          {title && <DialogTitle>{title}</DialogTitle>}
          {description && <DialogDescription>{description}</DialogDescription>}
          {children}
          {allowButton && (
            <Box sx={{ justifyContent: "flex-end" }}>
              <rDialog.Close asChild>
                <Button>{buttonText || "Save changes"}</Button>
              </rDialog.Close>
            </Box>
          )}
          {closeable && (
            <rDialog.Close
              asChild
              onClick={() => {
                setIsOpen(false);
                onClose && onClose();
              }}
            >
              <StyledAbsIconButton>
                <IoCloseOutline />
              </StyledAbsIconButton>
            </rDialog.Close>
          )}
        </DialogContent>
      </rDialog.Portal>
    </rDialog.Root>
  );
};

export default Dialog;
