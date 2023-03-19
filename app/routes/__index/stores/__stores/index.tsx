import { Link, useLoaderData } from "@remix-run/react";
import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";

import { requireUser } from "~/services/session.server";
import { getStores } from "~/models/store.server";

import { StyledImageWrapper, StyledImgNew } from "~/styles/stores/new.styled";
import { getAllItems } from "~/models/items.server";
import { ItemView } from "~/components";
import newStore from "~/assets/images/newStore.svg";

import { StyledItemLister } from "~/styles/stores/singleStore.styled";

export const loader = async ({ request }: LoaderArgs) => {
  const user = await requireUser(request);
  const url = new URL(request.url);

  const pageName = url.pathname.replace("/", "");

  const stores = await getStores(user.id);

  const items = await getAllItems(user.id);

  return json({ user, stores, items, pageName });
};

export default function StoresIndexRoute() {
  const { stores, items } = useLoaderData<typeof loader>();

  return (
    <>
      {stores.length === 0 ? (
        <Link to="/stores/new">
          <StyledImageWrapper>
            <StyledImgNew src={newStore} alt="create new store" />
          </StyledImageWrapper>
        </Link>
      ) : (
        <StyledItemLister>
          {items &&
            items.length > 0 &&
            items.map((item) => {
              return <ItemView id={item.id} key={item.id} />;
            })}
        </StyledItemLister>
      )}
    </>
  );
}
