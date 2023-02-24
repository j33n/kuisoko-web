import styled from "@emotion/styled";

import useImageColor from "use-image-color";
import { Image } from "use-image-color";

export interface IStyledImageContainer {
  bgColor?: string;
}

export const StyledImageContainer = styled.div<IStyledImageContainer>`
  border-radius: 0.5rem;
  position: relative;
  background: ${({ theme: { colors } }) => colors.white};
  border-radius: 0.5rem;
  min-width: 2.5rem;
  min-height: 2.5rem;

  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${({ bgColor }) => bgColor};
    opacity: 0.3;
    border-radius: 0.5rem;
  }
`;

export const StyledImage = styled(Image)`
  position: absolute;
  z-index: 1;
  height: 1.5rem !important;
  width: 1.5rem !important;
  padding: 0.5rem;
`;

export type RenderIconProps = {
  src: string,
}

const RenderIcon = ({ src }: RenderIconProps) => {
  const { colors } = useImageColor(src, { cors: true, colors: 5 });

  const bgColor = () => {
    if (colors && colors.length > 0) {
      if (colors[0] === "#040404") {
        return colors[1];
      } else {
        return colors[0];
      }
    }
    return "transparent";
  };

  return (
    <StyledImageContainer bgColor={bgColor()}>
      <StyledImage src={src} alt="icon" />
    </StyledImageContainer>
  );
};

export default RenderIcon;
