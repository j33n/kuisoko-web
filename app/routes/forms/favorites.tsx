import type { ActionFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { updateStoreFavorite } from "~/models/store.server";
import { getSession, requireUser } from "~/services/session.server";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const isStoreFavorite = formData.get("favorite");
  const storeId = formData.get("storeId");

  const user = await requireUser(request);

  let session = await getSession(request);

  if (!isStoreFavorite || !storeId || typeof storeId !== "string") {
    session.flash("error", "Validation error");
    return redirect(`?`);
  }
    
  session.flash("error", "Validation error");


  const store = await updateStoreFavorite({
    id: storeId,
    favorite: isStoreFavorite === "on" ? true : false,
    userId: user.id,
  });

  if (!store) {
    session.flash("error", "Error favoriting store");
    return redirect(`?`);
  }

  return redirect(`/stores/${storeId}`);
};
