import { redirect } from "@remix-run/node";
import { Outlet } from "@remix-run/react";

import type { LoaderFunction } from "@remix-run/node";

// export const loader: LoaderFunction = async () => {
//   return redirect("/login");
// };

export default function IndexRoute() {

  return (
    <div className="flex flex-col h-full min-h-screen">
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
}
