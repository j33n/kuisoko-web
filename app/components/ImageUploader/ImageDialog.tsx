import styled from "@emotion/styled";

import { Dialog, EmojiRenderer, ImageUploader } from "~/components";

import { StyledTabsContent, StyledTabsList, StyledTabsRoot, StyledTabsTrigger } from "./ImageDialog.styled";
import type { StyledTheme } from "~/styles/page.styled";

import uploadPlaceholder from "~/assets/images/addStoreIcon.svg";
import { IconButton } from "../Dialog/Dialog.styled";

export const StyledImagePlaceholder = styled.img<StyledTheme>`
  display: block;
  width: 5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.5rem;

  &:hover {
    background-color: ${({ theme: { colors } }) => colors.buttonBgHover};
  }
`;

const ImageDialog = () => {
  return (
    <Dialog
      trigger={<IconButton></IconButton>}
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
