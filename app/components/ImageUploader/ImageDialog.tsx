import styled from "@emotion/styled";

import { Dialog, EmojiRenderer, ImageUploader } from "~/components";

import uploadPlaceholder from "~/assets/images/addStoreIcon.svg";
import { StyledTabsContent, StyledTabsList, StyledTabsRoot, StyledTabsTrigger } from "./ImageDialog.styled";

export const StyledImagePlaceholder = styled.img`
  display: block;
  width: 5rem;

  &:hover {
    opacity: 0.5;
  }
`;

const ImageDialog = () => {
  return (
    <Dialog
      trigger={
        <StyledImagePlaceholder src={uploadPlaceholder} alt="placeholder" />
      }
      title="Upload image"
      description="Upload image"
      closeable
    >
      <StyledTabsRoot defaultValue="upload">
        <StyledTabsList aria-label="Upload store icon">
          <StyledTabsTrigger value="upload">Upload</StyledTabsTrigger>
          <StyledTabsTrigger value="emoji">Emoji</StyledTabsTrigger>
        </StyledTabsList>
        <StyledTabsContent value="upload">
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
