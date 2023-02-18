import { redirect } from "@remix-run/node";
import invariant from "tiny-invariant";

import type { ActionArgs } from "@remix-run/node";

import { authenticator } from "~/models/socialAuth.server";

export let loader = () => redirect("/login");

export let action = ({ request, params }: ActionArgs) => {
  const { provider } = params;
  invariant(provider, "Missing provider");

  return authenticator.authenticate(provider, request);
};
