import { useColorMode } from "theme-ui";
import styled from "@emotion/styled";
import EmojiPicker, { Theme } from "emoji-picker-react";
import { Box } from "theme-ui";

export const StyledEmojiWrapper = styled(Box)`
  padding-top: 0.5rem;

  aside {
    width: 100% !important;
    border-width: 0 !important;
  }
`;

const EmojiRenderer = () => {
  const [colorMode] = useColorMode();
  const emojiTheme = colorMode === "dark" ? Theme.DARK : Theme.LIGHT;

  return (
    <StyledEmojiWrapper>
      <EmojiPicker onEmojiClick={() => {}} theme={emojiTheme} />
    </StyledEmojiWrapper>
  );
};

export default EmojiRenderer;
