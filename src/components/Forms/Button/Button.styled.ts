import styled from "styled-components";
import { Button } from "theme-ui";

export const StyledButton = styled(Button)`
  background-color: ${({ theme: { colors } }) => colors.primary};
  font-size: 13px;
  color: white;
`;
