import styled from "@emotion/styled";
import { useColorMode } from "theme-ui";

import { CiCamera } from "react-icons/ci";

import coverDark from "~/assets/images/coverDark.svg";
import coverLight from "~/assets/images/coverLight.svg";

export const StyledCover = styled.div`
  display: flex;
  height: 250px;
  align-items: flex-start;
  opacity: 0.5;
  position: relative;

  img {
    width: 100%;
    height: 100%;
  }
`;

export const StyledPlaceholderIcon = styled.div`
  position: absolute;
`;

export const Cover = () => {
  const [colorMode] = useColorMode();
  return (
    <StyledCover>
      <img src={colorMode === "light" ? coverDark : coverLight} alt="cover" />
      <StyledPlaceholderIcon>
        <CiCamera />
      </StyledPlaceholderIcon>
    </StyledCover>
  );
};

export default Cover;
