import styled from "@emotion/styled";

import type { StyledTheme } from "~/styles/page.styled";
import { StyledPage } from "~/styles/page.styled";

import newStore from "~/assets/images/newStore.svg";
import { Link, Outlet } from "@remix-run/react";

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

export const StyledPageHeader = styled.div<StyledTheme>`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 50px;
  width: 100%;
  border-bottom: ${({ theme: { colors } }) =>
    `1px solid ${colors.buttonBgHover}`};
`;

export const StyledTitle = styled.div<StyledTheme>`
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme: { colors } }) => colors.text};
  margin-left: 1.5rem;
`;

export default function Stores() {
  return (
    <StyledPage>
      <StyledPageHeader>
        <StyledTitle>New Store</StyledTitle>
      </StyledPageHeader>
      <StyledContainer>
        <Outlet />
      </StyledContainer>
    </StyledPage>
  );
}
