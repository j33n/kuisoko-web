import { Outlet } from "@remix-run/react";

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
