import { json, redirect } from "@remix-run/node";
import { z } from "zod";
import invariant from "tiny-invariant";
import { prisma } from "~/db.server";

import { updateItemCustomDetails, updateItemDetails } from "~/models/items.server";
import { requireUser } from "~/services/session.server";

import type { ActionArgs } from "@remix-run/node";

export async function action({ request, params }: ActionArgs) {
  const user = await requireUser(request);
  const formData = await request.formData();

  // const formVals = Object.fromEntries(formData);

  // Object.keys(formVals).map((val, idx) => {
  //   await updateItemCustomDetails({
  //     value: formVals[val],
  //     typeName
  //   });
  // });

  console.log("😇========================>>>>>>>>", formData.getAll("text1"));

  const { storeId, itemId } = params;

  const itemCustomData = Object.fromEntries(formData);

  return null;
}
