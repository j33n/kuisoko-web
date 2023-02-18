import invariant from "tiny-invariant";

import type { LoaderArgs } from "@remix-run/node";

import { authenticator } from "~/models/socialAuth.server";

export const loader = async ({ request, params }: LoaderArgs) => {
  const { provider } = params;
  invariant(provider, "Missing provider");

  const resp = await authenticator.authenticate(provider, request, {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
  });

  console.log("============>>>>>> 🚀", resp)

  return resp;
};
