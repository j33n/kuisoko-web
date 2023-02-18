import type { ActionArgs, LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";

import { logout } from "~/services/session.server";

export async function action({ request }: ActionArgs) {
  return logout(request);
}

export const loader: LoaderFunction = async () => {
  return redirect("/login");
}


// import { ActionArgs } from "@remix-run/node";
// import { authenticator } from "~/server/auth.server";

// export let action = async ({ request, params }: ActionArgs) => {
//   await authenticator.logout(request, { redirectTo: "/" });
// };