import styled from "@emotion/styled";
import { Button } from "theme-ui";

export const StyledButton = styled(Button)<{ size?: string }>`
  display: block;
  width: ${({ size }) => size || "100%"};
`;
