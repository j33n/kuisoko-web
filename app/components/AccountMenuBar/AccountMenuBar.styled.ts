import styled from "@emotion/styled";
import { Link } from "@remix-run/react";

import { Box } from "theme-ui";
import type { StyledTheme } from "~/styles/page.styled";

export interface IStyledMenuBox {
  theme?: StyledTheme["theme"];
  active?: boolean;
}

export const StyledMenubarWrapper = styled(Box)<StyledTheme>`
  display: flex;
  flex-direction: row;
  width: 100%;
  border-bottom: 1px solid ${({ theme: { colors } }) => colors.gray4};
  justify-content: space-evenly;
`;

export const StyledMenubar = styled(Link)<StyledTheme>`
  display: flex;
  padding: 0.5rem 0;
  min-width: 15vw;
  justify-content: center;
  color: ${({ theme: { colors } }) => colors.text};

  &:hover {
    background: ${({ theme: { colors } }) => colors.buttonBgHover};
  }
`;

export const StyledMenuBox = styled(Box)<IStyledMenuBox>`
  display: flex;
  background: ${({ theme: { colors }, active }) =>
    active ? colors.buttonBgHover : "transparent"};
`;

export const StyledMenubarLink = styled(Box)<StyledTheme>`
  display: flex;

  svg {
    height: 1.5rem;
    width: 1.5rem;
    margin-right: 0.5rem;
  }
`;
