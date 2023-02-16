import { redirect } from "@remix-run/node";

import type { ActionArgs} from "@remix-run/node";
import invariant from "tiny-invariant";
import { updateStoreIcon } from "~/models/store.server";
import { requireUser } from "~/services/session.server";

export async function action({ params, request }: ActionArgs) {
  const formData = await request.formData();
  const user = await requireUser(request);
  const emoji = formData.get("emoji");

  invariant(params.storeId, "Missing store id")

  if (emoji && typeof emoji === "string") {
    await updateStoreIcon({
      id: params.storeId,
      icon: emoji,
      userId: user.id,
    });
  }

  return redirect(`/stores/${params.storeId}`);
}
