import styled from "@emotion/styled";

import { StyledPage } from "~/styles/page.styled";

import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import { getStores } from "~/models/store.server";
import { IconButton } from "theme-ui";
import { CiShop, CiSquarePlus } from "react-icons/ci";

import type { StyledTheme } from "~/styles/page.styled";
import type { LoaderArgs } from "@remix-run/node";

import { requireUser } from "~/services/session.server";
import { useTranslation } from "react-i18next";
import { RenderIcon } from "~/components";

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
  margin: 1rem;
  max-width: 78vw;
`;

export const StyledIconButton = styled(IconButton)<StyledTheme>`
  width: auto;
  height: auto;
  padding: 0.2rem 0.5rem;

  svg {
    width: 2rem;
    height: 2rem;
    margin-right: 0.5rem;
  }

  &:hover {
    background-color: ${({ theme: { colors } }) => colors.buttonBgHover};
  }
`;

export const StyledPinContainer = styled.div<StyledTheme>`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  overflow-x: auto;
  gap: 1rem;
`;

export const StyledPin = styled(Link)<StyledTheme>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  max-height: 3rem;
  border-radius: 0.56rem;
  border: ${({ theme: { colors } }) => `1px solid ${colors.gray6}`};

  &:hover {
    border: ${({ theme: { colors } }) => `1px solid ${colors.text}`};
    background-color: ${({ theme: { colors } }) => colors.buttonBgHover};
  }

  &:focus {
    border: ${({ theme: { colors } }) => `1px solid ${colors.blue4}`};
  }
`;

export const StyledPinImg = styled.div<StyledTheme>`
  display: flex;
`;

export const StyledPinText = styled.span<StyledTheme>`
  font-weight: 200;
  font-size: ${({ theme: { fontSizes } }) => fontSizes["xxs"]};
  height: 2.5rem;
  line-height: 2.5rem;
  vertical-align: middle;
  padding: 0 0.5rem;
  max-width: 150px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
  let { t } = useTranslation();
  return (
    <StyledPage>
      <StyledPageHeader>
        {data.storeList.length === 0 ? (
          <StyledTitle>New Store</StyledTitle>
        ) : (
          <StyledHeader>
            {/* <Link to="/stores">
              <CiSquarePlus />
            </Link> */}
            <StyledPinContainer>
              {data.storeList.map((store) => (
                <StyledPin key={store.id} to={store.id}>
                  {store.icon ? <RenderIcon src={store.icon} /> : <CiShop />}
                  <StyledPinText>{store.name}</StyledPinText>
                </StyledPin>
              ))}
            </StyledPinContainer>
            <Link
              to="/stores/new"
              style={{ height: "100%", lineHeight: "100%" }}
            >
              <StyledIconButton>
                <CiSquarePlus />
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
