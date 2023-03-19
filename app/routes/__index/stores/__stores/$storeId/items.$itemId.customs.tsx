import { LoaderArgs, json, redirect } from "@remix-run/node";
import { z } from "zod";
import invariant from "tiny-invariant";
import { prisma } from "~/db.server";

import {
  deleteItemCustomField,
  getCustomItemFields,
  saveItemCustomField,
  updateItemCustomField,
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

  const { fieldType, fieldValue, fieldId } = Object.fromEntries(formData);

  if (_action === "saveFieldName") {
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

  if (_action === "updateFieldName") {
    if (!fieldId || typeof fieldId !== "string") {
      throw json({ error: `invalid field id` }, 500);
    }

    if (!fieldValue || typeof fieldValue !== "string") {
      throw json({ error: `invalid type` }, 500);
    }

    return await updateItemCustomField({
      id: fieldId,
      customName: fieldValue,
      userId: user.id,
    });
  }

  if (_action === "deleteFieldName") {
    if (!fieldId || typeof fieldId !== "string") {
      throw json({ error: `invalid field id` }, 500);
    }

    return await deleteItemCustomField({
      id: fieldId,
      userId: user.id,
    });
  }
}
