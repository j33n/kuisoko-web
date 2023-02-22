import { redirect } from "@remix-run/node";
import { Outlet } from "@remix-run/react";

import { useTranslation } from "react-i18next";

import type { LoaderFunction } from "@remix-run/node";

// export const loader: LoaderFunction = async () => {
//   return redirect("/login");
// };

export default function IndexRoute() {

  let { t } = useTranslation();

  return (
    <div className="flex flex-col h-full min-h-screen">
      <div className="flex-1 p-6">
        <h1>{t("greeting")}</h1>
        <Outlet />
      </div>
    </div>
  );
}
