import React from "react";

import * as rDialog from "@radix-ui/react-dialog";
import { Button } from "~/components";
import { DialogContent, DialogDescription, DialogOverlay, DialogTitle } from "./Dialog.styled";

export interface IDialog {
  trigger: React.ReactNode;
  title?: string;
  description?: string;
  closeable?: boolean;
  children?: React.ReactNode;
  buttonText?: string;
}

export const Dialog = ({
  trigger,
  title,
  description,
  closeable,
  children,
  buttonText,
}: IDialog) => {
  return (
    <rDialog.Root>
      <rDialog.Trigger asChild>{trigger}</rDialog.Trigger>
      <rDialog.Portal>
        <DialogOverlay />
        <DialogContent >
          {title && (
            <DialogTitle className="DialogTitle">{title}</DialogTitle>
          )}
          {description && (
            <DialogDescription>{description}</DialogDescription>
          )}
          {children}
          {closeable && (
            <rDialog.Close asChild>
              <Button>{buttonText || "Save changes"}</Button>
            </rDialog.Close>
          )}
        </DialogContent>
      </rDialog.Portal>
    </rDialog.Root>
  );
};

export default Dialog;
