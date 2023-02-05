import newStore from "~/assets/images/newStore.svg";
import { Link } from "@remix-run/react";
import styled from "@emotion/styled";
import type { StyledTheme } from "~/styles/page.styled";

export const StyledImageWrapper = styled.div<StyledTheme>`
  height: 300px;
  overflow: hidden;
  border-radius: 1rem;
  border: ${({ theme: { colors } }) => `1px solid ${colors.buttonBgHover}`};
  cursor: pointer;
  padding: 1rem;

  &:hover {
    img {
      transform: scale(1.1);
    }
  }
`;

export const StyledImg = styled.img<StyledTheme>`
  object-fit: cover;
  transition: transform 0.8s;
  height: 100%;
`;

export default function Stores() {
  return (
    <Link to="/stores/new">
      <StyledImageWrapper>
        <StyledImg src={newStore} alt="create new store" />
      </StyledImageWrapper>
    </Link>
  );
}
