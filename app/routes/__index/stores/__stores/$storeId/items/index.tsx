import { useLoaderData } from "@remix-run/react";
import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import styled from "@emotion/styled";

import { getAllItems } from "~/models/items.server";
import { requireUser } from "~/services/session.server";

import { ItemView } from "~/components";

export const StyledItemsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  width: 70%;
`;

export const loader = async ({ request }: LoaderArgs) => {
  const user = await requireUser(request);

  const items = await getAllItems(user.id);

  return json({ user, items });
};

export default function ItemsRoute() {
  const { items } = useLoaderData<typeof loader>();

  return (
    <StyledItemsContainer>
      {items.map((item: any) => (
        <ItemView key={item.id} item={item} />
      ))}
    </StyledItemsContainer>
  );
}
