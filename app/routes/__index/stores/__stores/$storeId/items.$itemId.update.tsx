import { json, redirect } from "@remix-run/node";
import { z } from "zod";
import invariant from "tiny-invariant";
import { prisma } from "~/db.server";

import { createItem, updateItemDetails } from "~/models/items.server";
import { requireUser } from "~/services/session.server";

import type { ActionArgs } from "@remix-run/node";

export async function action({ request, params }: ActionArgs) {
  const user = await requireUser(request);
  const formData = await request.formData();

  console.log("_+_+_+_++_++++++ ✅", formData);

  const { storeId, itemId } = params;

  const itemFormData = Object.fromEntries(formData);

  const itemDetailsSchema = z.object({
    itemName: z.coerce.string().trim().min(1, {
      message: "Name is required!",
    }),
    itemPrice: z.coerce.number().min(1, {
      message: "Price is required!",
    }),
    itemQuantity: z.coerce.number().min(1, {
      message: "Quantity is required!",
    }),
    itemComment: z.string().optional(),
  });

  invariant(storeId, "store id is missing");
  invariant(itemId, "item id is missing");

  const validData = itemDetailsSchema.safeParse(itemFormData);

  if (!validData.success) {
    return json(validData.error.format());
  }

  // Check name is not in use
  const itemExists = await prisma.item.findMany({
    where: {
      name: validData.data.itemName,
      storeId,
    },
  });

  console.log("Item ==========>>>>>>", itemExists);

  if (itemExists && itemExists.length > 1) {
    return json(
      {
        itemName: {
          _errors: [`item ${validData.data.itemName} already exist`],
        },
      },
      { status: 400 }
    );
  }

  const updatedItem = await updateItemDetails({
    id: itemId,
    storeId,
    name: validData.data.itemName,
    comment: validData.data.itemComment ?? "",
    price: validData.data.itemPrice,
    quantity: validData.data.itemQuantity,
    userId: user.id,
  });

  console.log("🔥 ---------------->>>>>>>", updatedItem);

  return redirect(`/stores/${storeId}/items/${itemId}`);
}
