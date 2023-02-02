import newStore from "~/assets/images/newStore.svg";
import { Link } from "@remix-run/react";
import styled from "@emotion/styled";
import type { StyledTheme } from "~/styles/page.styled";

export const StyledImg = styled.img<StyledTheme>`
  width: 300px;
  padding: 1rem;
  border: ${({ theme: { colors } }) => `1px solid ${colors.buttonBgHover}`};
  border-radius: 0.5rem;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }
`;

export default function Stores() {
  return (
    <>
      <Link to="/stores/new">
        <StyledImg src={newStore} alt="create new store" />
      </Link>
    </>
  );
}
