import type { ActionArgs, LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";

import { logout } from "~/services/session.server";

export async function action({ request }: ActionArgs) {
  console.log("logout action");
  
  return logout(request);
}

export const loader: LoaderFunction = async () => {
  console.log("logout loader");
  
  return redirect("/login");
}
