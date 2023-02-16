import { useColorMode } from "theme-ui";
import styled from "@emotion/styled";
import EmojiPicker, { EmojiStyle, Theme } from "emoji-picker-react";
import { Box } from "theme-ui";
import { useParams, useSubmit } from "@remix-run/react";
import { useRef, useState } from "react";
import invariant from "tiny-invariant";

export const StyledEmojiWrapper = styled(Box)`
  padding-top: 0.5rem;

  aside {
    width: 100% !important;
    border-width: 0 !important;
  }
`;

export interface IEmojiRenderer {
  closeDialog: () => void;
}

const EmojiRenderer = ({ closeDialog }: IEmojiRenderer) => {
  const [colorMode] = useColorMode();
  const submit = useSubmit();
  let formData = new FormData();
  let params = useParams();

  const inputRef = useRef<HTMLInputElement>(null);
  const emojiTheme = colorMode === "dark" ? Theme.DARK : Theme.LIGHT;
  const [selectedEmoji, setSelectedEmoji] = useState("");

  invariant(params.storeId, "Missing storeId");
  
  const handleEmojiPick = (all: any) => {
    const defaultEmojiStyle = EmojiStyle.TWITTER;

    invariant(all.emoji, "Missing emoji");

    formData.append("emoji", all.getImageUrl(defaultEmojiStyle));
    setSelectedEmoji(all.getImageUrl(defaultEmojiStyle));
    submit(formData, {
      method: "post",
      action: `/stores/${params.storeId}/update`,
    });
    closeDialog();
  };

  return (
    <StyledEmojiWrapper>
      <EmojiPicker onEmojiClick={handleEmojiPick} theme={emojiTheme} />
      <input
        type="text"
        name="emoji"
        ref={inputRef}
        value={selectedEmoji}
        hidden
      />
    </StyledEmojiWrapper>
  );
};

export default EmojiRenderer;
