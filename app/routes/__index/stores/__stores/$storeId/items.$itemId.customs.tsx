import { json, redirect } from "@remix-run/node";
import { z } from "zod";
import invariant from "tiny-invariant";
import { prisma } from "~/db.server";

import { updateItemDetails } from "~/models/items.server";
import { requireUser } from "~/services/session.server";

import type { ActionArgs } from "@remix-run/node";

export async function action({ request, params }: ActionArgs) {
  const user = await requireUser(request);
  const formData = await request.formData();

  console.log("================>>>>>>>>", Object.fromEntries(formData));

  const { storeId, itemId } = params;

  const itemCustomData = Object.fromEntries(formData);

  return null;
}
