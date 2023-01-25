import React from "react";

import styled from "@emotion/styled";

import type { StyledTheme } from "~/components/Layout/Layout.styled";
import PageHeader from "~/components/PageHeader/PageHeader";

export const StyledPage = styled.div<StyledTheme>`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  position: relative;
  background: ${({ theme: { colors } }) => colors.background};
  color: ${({ theme: { colors } }) => colors.text};
`;


export default function Stores() {
  return (
    <StyledPage>
      <PageHeader  />
    </StyledPage>
  );
}
