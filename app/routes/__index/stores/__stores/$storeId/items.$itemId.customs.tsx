import { LoaderArgs, json, redirect } from "@remix-run/node";
import { z } from "zod";
import invariant from "tiny-invariant";
import { prisma } from "~/db.server";

import {
  getCustomItemFields,
  saveItemCustomField,
  // updateItemCustomDetails,
  updateItemDetails,
} from "~/models/items.server";
import { requireUser } from "~/services/session.server";

import type { ActionArgs } from "@remix-run/node";

export async function action({ request, params }: ActionArgs) {
  const user = await requireUser(request);
  const formData = await request.formData();

  const { itemId } = params;

  const { _action } = Object.fromEntries(formData);

  invariant(itemId, "item id is missing!");

  if (_action === "saveFieldName") {
    const { fieldType, fieldValue } = Object.fromEntries(formData);

    if (!fieldType || typeof fieldType !== "string") {
      throw json({ error: `invalid type` }, 500);
    }

    if (!fieldValue || typeof fieldValue !== "string") {
      throw json({ error: `invalid type` }, 500);
    }

    return await saveItemCustomField({
      type: fieldType,
      customName: fieldValue,
      itemId,
      userId: user.id,
    });
  }
}
