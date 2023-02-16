import newStore from "~/assets/images/newStore.svg";
import { Link, useLoaderData } from "@remix-run/react";
import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";

import { requireUser } from "~/services/session.server";
import { getStores } from "~/models/store.server";

import { StyledImageWrapper, StyledImgNew } from "~/styles/stores/new.styled";

export const loader = async ({ request }: LoaderArgs) => {
  const user = await requireUser(request);
  const url = new URL(request.url);

  const pageName = url.pathname.replace("/", "");

  const storeList = await getStores(user.id);

  return json({ user, storeList, pageName });
};

export default function Stores() {
  const data = useLoaderData<typeof loader>();

  return (
    <>
      {data.storeList.length === 0 ? (
        <Link to="/stores/new">
          <StyledImageWrapper>
            <StyledImgNew src={newStore} alt="create new store" />
          </StyledImageWrapper>
        </Link>
      ) : (
        <>
          <h2>My Stores</h2>
          {data.storeList.map((store) => (
            <div key={store.id}>
              <h3>{store.name}</h3>
              <p>{store.comment}</p>
            </div>
          ))}
        </>
      )}
    </>
  );
}
