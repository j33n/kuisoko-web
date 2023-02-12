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

export interface IImageDialog {
  tabsWidth?: string;
}

const ImageDialog = ({ tabsWidth }: IImageDialog) => {
  return (
    <Dialog
      closeable
      sxContent={{ padding: 0 }}
      trigger={
        <div>
          <DialogTrigger />
        </div>
      }
    >
      <StyledTabsRoot defaultValue="custom">
        <StyledTabsList aria-label="Upload store icon" tabsWidth={tabsWidth}>
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
