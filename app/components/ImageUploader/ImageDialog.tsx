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

const DialogTrigger = () => (
  <StyledIcon>
    <CiFaceSmile />
    <StyledText>Add Icon</StyledText>
  </StyledIcon>
);

const ImageDialog = () => {
  return (
    <Dialog
      closeable
      sxContent={{ padding: 0, borderRadius: "0.5rem", paddingTop: "1rem" }}
      trigger={
        <div>
          <DialogTrigger />
        </div>
      }
    >
      <StyledTabsRoot defaultValue="custom">
        <StyledTabsList aria-label="Upload store icon">
          <StyledTabsTrigger value="custom">Custom</StyledTabsTrigger>
          <StyledTabsTrigger value="emoji">Emoji</StyledTabsTrigger>
        </StyledTabsList>
        <StyledTabsContent value="custom">
          <ImageUploader />
        </StyledTabsContent>
        <StyledTabsContent value="emoji">
          <EmojiRenderer />
        </StyledTabsContent>
      </StyledTabsRoot>
    </Dialog>
  );
};

export default ImageDialog;
