import { useLoaderData } from "@remix-run/react";
import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import styled from "@emotion/styled";

import { deleteItem, getAllItems } from "~/models/items.server";
import { requireUser } from "~/services/session.server";

import { ItemView } from "~/components";
import { StyledItemLink } from "~/styles/page.styled";

export const StyledItemsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  width: 70%;
`;

export async function action({ params, request }: ActionArgs) {
  const formData = await request.formData();
  const user = await requireUser(request);

  const { itemId } = Object.fromEntries(formData);

  if (!itemId || typeof itemId !== "string") {
    throw json({
      error: `invalid item Id ${itemId}`,
    });
  }

  const res = await deleteItem({
    id: itemId,
    userId: user.id,
  });

  return json({
    res,
  });
}

export const loader = async ({ request, params }: LoaderArgs) => {
  const user = await requireUser(request);

  const {storeId} = params;

  const items = await getAllItems(user.id);

  return json({ user, items, storeId });
};

export default function ItemsRoute() {
  const { items, storeId } = useLoaderData<typeof loader>();

  return (
    <StyledItemsContainer>
      {items.map((item: any) => (
        <StyledItemLink to={`/stores/${storeId}/items/${item.id}`} key={item.id}>
          <ItemView item={item} />
        </StyledItemLink>
      ))}
    </StyledItemsContainer>
  );
}
