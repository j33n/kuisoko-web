import styled from "@emotion/styled";

import { Box } from "theme-ui";

export interface IStyledMenuBox {
  active?: boolean;
}

export const StyledContent = styled(Box)`
  display: flex;
  flex-direction: row;
  width: 100%;
  border-bottom: 1px solid ${({ theme: { colors } }) => colors.gray4};
  justify-content: space-evenly;
`;
