import styled from '@emotion/styled';

export type StyledEmojiProps = {
    size?: string;
};

export const StyledEmoji = styled.span<StyledEmojiProps>`
  display: inline-block;
  width: ${({ size }) => size || "60px"};
  height: ${({ size }) => size || "60px"};
  height: 1em;
  vertical-align: -0.125em;
`;
