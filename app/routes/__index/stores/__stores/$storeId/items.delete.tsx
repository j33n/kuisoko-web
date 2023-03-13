import { json, redirect } from "@remix-run/node";
import { requireUser } from "~/services/session.server";

import type { ActionArgs } from "@remix-run/server-runtime";
import { deleteItem } from "~/models/items.server";

export async function action({ params, request }: ActionArgs) {
  const formData = await request.formData();
  const user = await requireUser(request);

  const { storeId } = params;

  const { itemId } = Object.fromEntries(formData);

  if (!itemId || typeof itemId !== "string") {
    throw json({
      error: `invalid item Id ${itemId}`,
    });
  }

  const deletedItem = await deleteItem({
    id: itemId,
    userId: user.id,
  });

  if (!deletedItem) {
    throw new Response("Oopsie, failed to delete item", { status: 500 });
  };

  return redirect(`/stores/${storeId}`);
}
