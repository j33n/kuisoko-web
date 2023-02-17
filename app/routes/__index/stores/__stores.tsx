import styled from "@emotion/styled";

import { StyledPage } from "~/styles/page.styled";

import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import { getStores } from "~/models/store.server";
import { IconButton } from "theme-ui";
import { CiSquarePlus } from "react-icons/ci";

import type { StyledTheme } from "~/styles/page.styled";
import type { LoaderArgs } from "@remix-run/node";

import { requireUser } from "~/services/session.server";

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

export const StyledHeader = styled.div<StyledTheme>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const StyledIconButton = styled(IconButton)<StyledTheme>`
  width: auto;
  height: auto;
  padding: 0.2rem 0.5rem;
  margin-right: 1rem;

  svg {
    width: 2rem;
    height: 2rem;
    margin-right: 0.5rem;
  }

  &:hover {
    background-color: ${({ theme: { colors } }) => colors.buttonBgHover};
  }
`;

export const loader = async ({ request }: LoaderArgs) => {
  const user = await requireUser(request);
  const url = new URL(request.url);

  const pageName = url.pathname.replace("/", "");

  const storeList = await getStores(user.id);

  return json({ user, storeList, pageName });
};

export default function Stores() {
  const data = useLoaderData<typeof loader>();
  return (
    <StyledPage>
      <StyledPageHeader>
        {data.storeList.length === 0 ? (
          <StyledTitle>New Store</StyledTitle>
        ) : (
          <StyledHeader>
            <Link to="/stores">
              <StyledTitle>My Stores</StyledTitle>
            </Link>
            <Link
              to="/stores/new"
              style={{ height: "100%", lineHeight: "100%" }}
            >
              <StyledIconButton>
                <CiSquarePlus />
                New Store
              </StyledIconButton>
            </Link>
          </StyledHeader>
        )}
      </StyledPageHeader>
      <StyledContainer>
        <Outlet />
      </StyledContainer>
    </StyledPage>
  );
}
