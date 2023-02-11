import styled from "@emotion/styled";
import EmojiPicker from "emoji-picker-react";
import { Box } from "theme-ui";

export const StyledEmojiWrapper = styled(Box)`
  padding-top: 0.5rem;

  aside {
    width: 100% !important;
    border-width: 0 !important;
  }
`;

const EmojiRenderer = () => (
  <StyledEmojiWrapper>
    <EmojiPicker />
  </StyledEmojiWrapper>
);

export default EmojiRenderer;
