import { redirect, unstable_parseMultipartFormData } from "@remix-run/node";
import invariant from "tiny-invariant";

import { updateItemImages } from "~/models/items.server";
import { requireUser } from "~/services/session.server";
import { s3UploaderHandler } from "~/models/uploader-handler.server";

import type { ActionArgs } from "@remix-run/node";

export async function action({ request, params }: ActionArgs) {
  const user = await requireUser(request);

  const { storeId, itemId } = params;

  invariant(storeId, "store id is missing");
  invariant(itemId, "item id is missing");

  const uploadBody = await unstable_parseMultipartFormData(
    request,
    s3UploaderHandler
  );

  const images = uploadBody.getAll("itemImages");

  await updateItemImages({
    images: images as string[],
    id: itemId,
    userId: user.id,
  });

  return redirect(`/stores/${storeId}`);
}
