import { json, redirect } from "@remix-run/node";

import type { ActionArgs } from "@remix-run/node";

import { createItem } from "~/models/items.server";
import { requireUser } from "~/services/session.server";

import invariant from "tiny-invariant";
import { containsOnlyNumbers } from "~/utils";

export async function action({ request, params }: ActionArgs) {
  const user = await requireUser(request);
  const formData = await request.formData();

  const { storeId } = params;

  const { itemName, itemComment, itemPrice, itemQuantity } =
    Object.fromEntries(formData);

  // server validations
  if (typeof itemName !== "string" || itemName.length === 0) {
    return json(
      {
        errors: {
          itemName: "Item name is required",
          itemComment: null,
          itemPrice: null,
          itemQuantity: null,
        },
      },
      { status: 400 }
    );
  }

  if (typeof itemComment !== "string" || itemComment.length === 0) {
    return json(
      {
        errors: {
          itemName: null,
          itemComment: "Item comment is required",
          itemPrice: null,
          itemQuantity: null,
        },
      },
      { status: 400 }
    );
  }

  if (typeof itemQuantity !== "string" || !containsOnlyNumbers(itemQuantity)) {
    return json(
      {
        errors: {
          itemName: null,
          itemComment: null,
          itemPrice: null,
          itemQuantity: "Item quantity is required",
        },
      },
      { status: 400 }
    );
  }

  if (typeof itemPrice !== "string" || !containsOnlyNumbers(itemPrice)) {
    return json(
      {
        errors: {
          itemName: null,
          itemComment: null,
          itemPrice: "Item price is required",
          itemQuantity: null,
        },
      },
      { status: 400 }
    );
  }

  invariant(storeId, "store id is missing");

  // create store
  const item = await createItem({
    name: itemName,
    comment: itemComment,
    price: Number(itemPrice),
    quantity: Number(itemQuantity),
    storeId,
    userId: user.id,
  });

  return redirect(`/stores/${storeId}/uploads/${item.id}`);
}
