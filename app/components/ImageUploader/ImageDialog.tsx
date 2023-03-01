import { useState } from "react";
import { CiFaceSmile } from "react-icons/ci";

import { Dialog, EmojiRenderer, ImageUploader } from "~/components";

import {
  StyledIcon,
  StyledTabsContent,
  StyledTabsList,
  StyledTabsRoot,
  StyledTabsTrigger,
  StyledText,
} from "./ImageDialog.styled";

import type { ReactNode } from "react";

export interface IDialog {
  tabSize?: string;
  triggerIcon?: string | null;
  defaultTriggerIcon?: ReactNode;
}

const DialogTrigger = ({ triggerIcon, defaultTriggerIcon }: IDialog) => (
  <>
    {triggerIcon ? (
      <StyledIcon sx={{ padding: "0.5rem" }}>
        <img src={triggerIcon} alt="Store icon" />
      </StyledIcon>
    ) : (
      <StyledIcon sx={{ padding: "0.2rem 0.5rem" }}>
        {defaultTriggerIcon || (
          <>
            <CiFaceSmile />
            <StyledText>Add Icon</StyledText>
          </>
        )}
      </StyledIcon>
    )}
  </>
);

const ImageDialog = ({ tabSize, triggerIcon, defaultTriggerIcon }: IDialog) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog
      closeable
      open={open}
      sxContent={{ padding: 0 }}
      trigger={
        <div onClick={() => setOpen(true)}>
          <DialogTrigger
            triggerIcon={triggerIcon}
            defaultTriggerIcon={defaultTriggerIcon}
          />
        </div>
      }
    >
      <StyledTabsRoot defaultValue="custom">
        <StyledTabsList
          aria-label="Upload store icon"
          css={{ width: tabSize || "100%" }}
        >
          <StyledTabsTrigger value="custom">Custom</StyledTabsTrigger>
          <StyledTabsTrigger value="emoji">Emoji</StyledTabsTrigger>
        </StyledTabsList>
        <StyledTabsContent value="custom">
          <ImageUploader />
        </StyledTabsContent>
        <StyledTabsContent value="emoji">
          <EmojiRenderer closeDialog={() => setOpen(false)} />
        </StyledTabsContent>
      </StyledTabsRoot>
    </Dialog>
  );
};

export default ImageDialog;
