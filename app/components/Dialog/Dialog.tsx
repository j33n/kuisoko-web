import React from "react";
import { CiCircleRemove } from "react-icons/ci";
import * as rDialog from "@radix-ui/react-dialog";

import { Button } from "~/components";
import {
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogTitle,
  Flex,
  IconButton,
} from "./Dialog.styled";

export interface IDialog {
  trigger: React.ReactNode;
  title?: string;
  description?: string;
  closeable?: boolean;
  children?: React.ReactNode;
  buttonText?: string;
  allowButton?: boolean;
}

export const Dialog = ({
  trigger,
  title,
  description,
  closeable = true,
  children,
  buttonText,
  allowButton = false,
}: IDialog) => {
  return (
    <rDialog.Root>
      <rDialog.Trigger asChild>{trigger}</rDialog.Trigger>
      <rDialog.Portal>
        <DialogOverlay />
        <DialogContent>
          {title && <DialogTitle>{title}</DialogTitle>}
          {description && <DialogDescription>{description}</DialogDescription>}
          {children}
          {allowButton && (
            <Flex css={{ marginTop: 25, justifyContent: "flex-end" }}>
              <rDialog.Close asChild>
                <Button>{buttonText || "Save changes"}</Button>
              </rDialog.Close>
            </Flex>
          )}
          {closeable && (
            <rDialog.Close asChild>
              <IconButton aria-label="Close">
                <CiCircleRemove />
              </IconButton>
            </rDialog.Close>
          )}
        </DialogContent>
      </rDialog.Portal>
    </rDialog.Root>
  );
};

export default Dialog;
