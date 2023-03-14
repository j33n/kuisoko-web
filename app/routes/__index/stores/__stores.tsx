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
import { getAllItems } from "~/models/items.server";

export const loader = async ({ request }: LoaderArgs) => {
  const user = await requireUser(request);

  const stores = await getStores(user.id);
  const items = await getAllItems(user.id);

  const favoriteStoreList = await getFavoriteStores(user.id);

  return json({ user, stores, items, favoriteStoreList });
};

export default function StoresLayoutRoute() {
  const { stores } = useLoaderData<typeof loader>();
  let { t } = useTranslation();

  return (
    <StyledPage>
      <StyledPageHeader>
        {stores.length === 0 ? (
          <StyledHeaderTitle>{t("newStore")}</StyledHeaderTitle>
        ) : (
          <StyledHeader>
            <StyledPinContainer>
              {stores.map((store) => (
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
