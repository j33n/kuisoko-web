import { useCatch, useParams } from "@remix-run/react";
import invariant from "tiny-invariant";
import { json } from "@remix-run/node";

import { requireUser } from "~/services/session.server";
import { getItem } from "~/models/items.server";

import { ErrorView, NewItem } from "~/components";

import type { LoaderArgs } from "@remix-run/node";

export const loader = async ({ request, params }: LoaderArgs) => {
  const user = await requireUser(request);

  const { itemId, storeId } = params;

  invariant(itemId, "item id is required!");
  invariant(storeId, "store id is required!");

  const item = await getItem({ id: itemId, storeId, userId: user.id });

  return json({ item });
};

export default function ItemDetailsRoute() {
  return <NewItem />;
}

export function ErrorBoundary(error: Error) {
  const caught = useCatch();
  const params = useParams();

  if (caught && caught.status === 404) {
    return <div>{`Item ${params.itemId}" not found!`}</div>;
  }

  if (caught && caught.status) {
    throw new Error(`Unexpected caught response with status: ${caught.status}`);
  }

  if (error) {
    return <ErrorView error={error} />;
  }
}
