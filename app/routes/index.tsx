import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { useParams } from "@remix-run/react";

// Remix get page path

export const loader = async ({ params }: LoaderArgs) => {
  console.log(params["*"]);
  return null;
};

export const action = async ({ params }: ActionArgs) => {
  console.log(params["*"]);
};

export default function IndexRoute() {

  const params = useParams();
  console.log(params["*"]);

  return (
    <div>
      <h1>/Home</h1>
    </div>
  );
}
