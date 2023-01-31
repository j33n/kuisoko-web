import React from "react";
import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { useParams } from "@remix-run/react";

// Remix get page path

// export async function loader({ params }: LoaderArgs) {
//   // return json(await getReport(params.id));
//   console.log("params ===============>", params);
// }

export const loader = async ({ params }: LoaderArgs) => {
  console.log(params["*"]);
  return null;
};

export const action = async ({ params }: ActionArgs) => {
  console.log(params["*"]);
};

export default function SingleStoreRoute() {
  const params = useParams();
  console.log(params["*"]);

  return (
    <div>
      <h1>some store</h1>
    </div>
  );
}
