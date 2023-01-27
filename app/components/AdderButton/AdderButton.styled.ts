import styled from "@emotion/styled";

import type { StyledTheme } from "~/styles/page.styled";

export const StyledAdd = styled.div<StyledTheme>`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding: 0.5rem 2rem;
  border-bottom: ${({ theme: { colors } }) =>
    `1px solid ${colors.buttonBgHover}`};
  \ svg {
    width: 2rem;
    height: 2rem;
    margin: 0.5rem;
    color: ${({ theme: { colors } }) => colors.text};
    margin: "0 auto";
    transition: "transform 1000ms ease";
  }
`;

export const StyledText = styled.span`
  font-weight: 200;
`;
