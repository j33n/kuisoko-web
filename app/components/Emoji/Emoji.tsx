import { memo } from "react";
import twemoji from "twemoji";
import { StyledEmoji } from "./Emoji.styled";

export interface IEmoji {
  emoji: string;
  size?: string;
}

const Emoji = ({ emoji, size }: IEmoji) => (
  <StyledEmoji size={size}
    dangerouslySetInnerHTML={{
      __html: twemoji.parse(emoji, {
        folder: "svg",
        ext: ".svg",
      }),
    }}
  />
);

export default memo(Emoji);
