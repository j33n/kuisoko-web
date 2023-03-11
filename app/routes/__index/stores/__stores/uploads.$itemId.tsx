import { unstable_parseMultipartFormData } from "@remix-run/node";
import invariant from "tiny-invariant";

import { updateItemImages } from "~/models/items.server";
import { requireUser } from "~/services/session.server";

import { s3UploaderHandler } from "~/models/uploader-handler.server";

import type { ActionArgs } from "@remix-run/node";

export async function action({ request, params }: ActionArgs) {
  const user = await requireUser(request);
  const formData = await unstable_parseMultipartFormData(
    request,
    s3UploaderHandler
  );

  console.log("🎉 ====>>>>>", Object.fromEntries(formData));

  const { itemId } = params;

  invariant(itemId, "item id is missing");

  // create store
  const item = await updateItemImages({
    images: [],
    id: itemId,
    userId: user.id,
  });

  return null;
}
