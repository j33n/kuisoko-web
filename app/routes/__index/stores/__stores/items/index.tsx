import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";


export default function itemsRoute() {
    // const items = useLoaderData<typeof loader>();
  return (
    <div>
      Items live here
    </div>
  );
}
