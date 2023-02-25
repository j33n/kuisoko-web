import { Outlet, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";

import { requireUser } from "~/services/session.server";
import { AccountMenuBar } from "~/components";

import { Header, Sidebar } from "~/components";
import {
  StyledLayout,
  StyledContent,
  StyledBodyContent,
} from "~/components/Layout/Layout.styled";

import type { LoaderArgs } from "@remix-run/node";
import { getStores } from "~/models/store.server";

export interface ILayout {
  children: React.ReactNode;
  setCurrentTheme: (theme: string) => void;
  currentTheme: string;
}

export const loader = async ({ request }: LoaderArgs) => {
  const user = await requireUser(request);
  const url = new URL(request.url);

  const pageName = url.pathname.replace("/", "");

  const storeList = await getStores(user.id);

  return json({ user, storeList, pageName });
};

const UserLayout = () => {
  const { user, storeList } = useLoaderData<any>();

  return (
    <StyledLayout>
      <Header />
      <StyledContent sx={{ flexDirection: "row" }}>
        <Sidebar user={user} storeList={storeList} />
        <StyledBodyContent noFooter>
          <AccountMenuBar />
          <Outlet />
        </StyledBodyContent>
      </StyledContent>
    </StyledLayout>
  );
};

export default UserLayout;
