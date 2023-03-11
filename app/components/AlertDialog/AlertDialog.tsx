import React from "react";
import * as AlertDialogRadix from "@radix-ui/react-alert-dialog";
import { FlexCenterEnd } from "~/styles/page.styled";
import {
  StyledAlertDialogContent,
  StyledAlertDialogDescription,
  StyledAlertDialogOverlay,
  StyledAlertDialogTitle,
  StyledBtnContainer,
  StyledButton,
} from "./AlertDialog.styled";
import { Button } from "theme-ui";

export type AlertDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trigger?: React.ReactNode;
  title?: string;
  description?: string;
  onConfirm: () => void;
};

const AlertDialog = ({
  open = false,
  onOpenChange,
  trigger = <Button>Delete account</Button>,
  title,
  description,
  onConfirm,
}: AlertDialogProps) => {
  return (
    <AlertDialogRadix.Root open={open} onOpenChange={onOpenChange}>
      <AlertDialogRadix.Trigger asChild>{trigger}</AlertDialogRadix.Trigger>
      <AlertDialogRadix.Portal>
        <StyledAlertDialogOverlay />
        <StyledAlertDialogContent>
          <StyledAlertDialogTitle>
            {title || "Are you absolutely sure?"}
          </StyledAlertDialogTitle>
          {description && (
            <StyledAlertDialogDescription>
              {description}
            </StyledAlertDialogDescription>
          )}
          <FlexCenterEnd css={{ justifyContent: "flex-end" }}>
            <AlertDialogRadix.Cancel asChild>
              <StyledBtnContainer>
                <StyledButton>Cancel</StyledButton>
              </StyledBtnContainer>
            </AlertDialogRadix.Cancel>
            <AlertDialogRadix.Action asChild onClick={onConfirm}>
              <StyledBtnContainer>
                <StyledButton confirm>Yes, delete account</StyledButton>
              </StyledBtnContainer>
            </AlertDialogRadix.Action>
          </FlexCenterEnd>
        </StyledAlertDialogContent>
      </AlertDialogRadix.Portal>
    </AlertDialogRadix.Root>
  );
};

export default AlertDialog;
