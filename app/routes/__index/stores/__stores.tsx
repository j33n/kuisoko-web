import { Outlet, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import { useTranslation } from "react-i18next";
import { CiSquarePlus } from "react-icons/ci";

import { getFavoriteStores, getStores } from "~/models/store.server";

import { requireUser } from "~/services/session.server";
import { RenderIcon } from "~/components";
import {
  StyledPageHeader,
  StyledHeaderTitle,
  StyledHeader,
  StyledPinContainer,
  StyledPin,
  StyledPinText,
  StyledNewStoreLink,
  StyledIconButton,
  StyledNewText,
  StyledPage,
  StyledOutletContainer,
} from "~/components/Layout/Layout.styled";

import type { LoaderArgs } from "@remix-run/node";

export const loader = async ({ request }: LoaderArgs) => {
  const user = await requireUser(request);
  const url = new URL(request.url);

  const pageName = url.pathname.replace("/", "");

  const storeList = await getStores(user.id);
  const favoriteStoreList = await getFavoriteStores(user.id);

  return json({ user, storeList, favoriteStoreList, pageName });
};

export default function Stores() {
  const data = useLoaderData<typeof loader>();
  let { t } = useTranslation();

  return (
    <StyledPage>
      <StyledPageHeader>
        {data.storeList.length === 0 ? (
          <StyledHeaderTitle>{t("newStore")}</StyledHeaderTitle>
        ) : (
          <StyledHeader>
            <StyledPinContainer>
              {data.storeList.map((store) => (
                <StyledPin key={store.id} to={store.id}>
                  <RenderIcon src={store.icon} />
                  <StyledPinText>{store.name}</StyledPinText>
                </StyledPin>
              ))}
            </StyledPinContainer>
            <StyledNewStoreLink to="/stores/new">
              <StyledIconButton>
                <CiSquarePlus />
                <StyledNewText>{t("newStore")}</StyledNewText>
              </StyledIconButton>
            </StyledNewStoreLink>
          </StyledHeader>
        )}
      </StyledPageHeader>
      <StyledOutletContainer>
        <Outlet />
      </StyledOutletContainer>
    </StyledPage>
  );
}
