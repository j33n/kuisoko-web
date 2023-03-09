import styled from "@emotion/styled";
import { Button, Text } from "theme-ui";
import { FlexCenterStart } from "~/styles/page.styled";
import { StyledFocus } from "../Button/Button.styled";

export const StyledImageUpload = styled(Button)`
  all: unset;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 0.5rem;
  min-height: 5rem;
  height: 5rem;
  width: 5rem;
  background: ${({ theme: { colors }, disabled }) =>
    disabled ? colors.gray6 : colors.buttonBgHover};
  position: relative;
  color: ${({ theme: { colors } }) => colors.text};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};

  &:hover {
    background: ${({ theme: { colors }, disabled }) =>
      disabled ? colors.gray6 : colors.buttonBgHover};
    border: none;
  }

  ${StyledFocus};
`;

export const StyledImageHolder = styled(FlexCenterStart)`
  width: 100%;
  margin: 0.75rem 0;
`;

export const StyledUploadText = styled(Text)`
  font-weight: ${({ theme: { fontWeights } }) => fontWeights.bold};
  font-size: ${({ theme: { fontSizes } }) => fontSizes.xls};
`;

export const StyledUploadView = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  flex-direction: row;
  position: relative;
  width: 100%;
  margin-bottom: 0.75rem;

  img {
    flex: 1;
    height: 5rem;
    border-radius: 0.5rem;
    background: ${({ theme: { colors } }) => colors.white};
    position: relative;
  }
`;

export const StyledImagePreview = styled.div`
  position: relative;
`;
