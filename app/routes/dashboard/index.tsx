import { authenticator } from "~/services/auth.server";

import type { LoaderArgs } from "@remix-run/node";

export const loader = async ({ request }: LoaderArgs) => {
  // authenticator.isAuthenticated function returns the user object if found
  // if user is not authenticated then user would be redirected back to homepage ("/" route)
  const user = await authenticator.isAuthenticated(request, {
    // failureRedirect: "/",
  });

  return {
    user,
  };
};

export default function Dashboard() {
  return (
    <div>
      <h1>/Dashboard</h1>
    </div>
  );
}
