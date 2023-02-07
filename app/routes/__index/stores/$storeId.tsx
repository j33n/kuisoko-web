import invariant from "tiny-invariant";
import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { prisma } from "~/db.server";
import { useCatch, useLoaderData, useParams } from "@remix-run/react";

export const loader = async ({ params }: LoaderArgs) => {
  invariant(params.storeId, "Missing store id");

  const store = await prisma.store.findFirst({
    where: {
      id: params.storeId,
    },
  });

  if (!store) {
    throw new Response("Oops, Store not found", { status: 404 });
  }

  return json({ store });
};

export default function StoreDetailsRoute() {
  const data = useLoaderData<typeof loader>();
  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  const params = useParams();

  if (caught.status === 404) {
    return <div>Store "{params.storeId}" not found</div>;
  }

  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}
