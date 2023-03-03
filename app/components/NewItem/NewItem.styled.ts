import styled from "@emotion/styled";
import { Text } from "theme-ui";
import { FlexCenter, FlexCenterStart } from "~/styles/page.styled";

export const StyledImageUpload = styled(FlexCenter)`
  flex-direction: column;
  border-radius: 0.5rem;
  min-height: 5rem;
  padding: 0.5rem;
  background: ${({ theme: { colors } }) => colors.white};
  position: relative;
  color: ${({ theme: { colors } }) => colors.nav};
  cursor: pointer;

  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${({ theme: { colors } }) => colors.nav};
    opacity: 0.2;
    border-radius: 0.5rem;
  }
`;

export const StyledImageHolder = styled(FlexCenterStart)`
  width: 100%;
  margin: 0.75rem 0;
`;

export const StyledUploadText = styled(Text)`
  font-size: ${({ theme: { fontSizes } }) => fontSizes.xxs};
`;

export const StyledUploadView = styled.div`
  display: flex;
`;
