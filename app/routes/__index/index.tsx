import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Outlet } from "@remix-run/react";

import { getNoteListItems } from "~/models/note.server";
import { requireUserId } from "~/services/session.server";

// export async function loader({ request }: LoaderArgs) {
//   const userId = await requireUserId(request);
//   const noteListItems = await getNoteListItems({ userId });
//   return json({ noteListItems });
// }

export default function IndexRoute() {

  return (
    <div className="flex flex-col h-full min-h-screen">
      <div className="flex-1 p-6">
        IndexRoute
        <Outlet />
      </div>
    </div>
  );
}
