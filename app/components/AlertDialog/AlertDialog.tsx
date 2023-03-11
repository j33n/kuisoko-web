import React from "react";
import * as AlertDialogRadix from "@radix-ui/react-alert-dialog";
import { FlexCenterEnd } from "~/styles/page.styled";
import {
  StyledAlertDialogContent,
  StyledAlertDialogDescription,
  StyledAlertDialogOverlay,
  StyledAlertDialogTitle,
} from "./AlertDialog.styled";
import { Button } from "theme-ui";
import { StyledBtnContainer } from "../NewItem/NewItem.styled";

export type AlertDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trigger?: React.ReactNode;
  title?: string;
  description?: string;
};

const AlertDialog = ({
  open = false,
  onOpenChange,
  trigger = <Button>Delete account</Button>,
  title,
  description,
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
                <Button
                  onClick={() => onOpenChange(false)}
                  variant="mauve"
                  sx={{ marginRight: 25 }}
                >
                  Cancel
                </Button>
              </StyledBtnContainer>
            </AlertDialogRadix.Cancel>
            <AlertDialogRadix.Action asChild>
              <StyledBtnContainer style={{ width: "auto", height: "100%" }}>
                <Button style={{ height: "100%" }} variant="red">
                  Yes, delete account
                </Button>
              </StyledBtnContainer>
            </AlertDialogRadix.Action>
          </FlexCenterEnd>
        </StyledAlertDialogContent>
      </AlertDialogRadix.Portal>
    </AlertDialogRadix.Root>
  );
};

export default AlertDialog;
