import invariant from "tiny-invariant";
import { json } from "@remix-run/node";

import type { LoaderArgs } from "@remix-run/node";
import { prisma } from "~/db.server";
import { useLoaderData } from "@remix-run/react";
import { NewItem, ItemView } from "~/components";
import { requireUser } from "~/services/session.server";

import {
  StyledContentWrapper,
  StyledItemLister,
  StyledItemListHeader,
} from "~/styles/stores/singleStore.styled";

import { getStoreItems } from "~/models/items.server";

export const loader = async ({ params, request }: LoaderArgs) => {
  invariant(params.storeId, "Missing store id");
  const user = await requireUser(request);

  const store = await prisma.store.findFirst({
    where: {
      id: params.storeId,
    },
  });

  let items;

  if (store) {
    items = await getStoreItems(store.id, user.id);
  }

  if (!store) {
    throw new Response("Oops, Store not found", { status: 404 });
  }

  return json({ store, items });
};

export type FavoriteFormProps = {
  storeId: string;
};

export default function StoreDetailsRoute() {
  const { items, store } = useLoaderData<typeof loader>();

  const handleDeleteItem = () =>{
    console.log("deleting ...");
    
  }

  return (
    <StyledContentWrapper style={{ borderRadius: "0 0 0.5rem 0.5rem" }}>
      <StyledItemListHeader>
        {items && items.length > 0 ? (
          <span>
            {items.length} {items.length === 1 ? "item" : "items"}
          </span>
        ) : (
          "No items in store"
        )}
        <NewItem store={store} />
      </StyledItemListHeader>
      {items && items.length > 0 && (
        <StyledItemLister>
          {items.map((item) => {
            return <ItemView key={item.id} item={item} handleDelete={handleDeleteItem} />;
          })}
        </StyledItemLister>
      )}
    </StyledContentWrapper>
  );
}
