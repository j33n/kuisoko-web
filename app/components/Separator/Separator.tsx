import styled from "@emotion/styled";
import * as rSeparator from "@radix-ui/react-separator";

export const SeparatorRoot = styled(rSeparator.Root)<any>`
  background-color: ${({ theme: { colors } }) => colors.nav};
  &[data-orientation="horizontal"] {
    height: 1px;
    width: 100%;
  }
  &[data-orientation="vertical"] {
    height: 100%;
    width: 1px;
  }
`;

export default {
    SeparatorRoot,
};
