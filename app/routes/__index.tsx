import { Outlet, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";

import { requireUser } from "~/services/session.server";

import { Header, Sidebar } from "~/components";
import {
  StyledLayout,
  StyledContent,
  StyledBodyContent,
} from "~/components/Layout/Layout.styled";

import type { LoaderArgs } from "@remix-run/node";

export interface ILayout {
  children: React.ReactNode;
  setCurrentTheme: (theme: string) => void;
  currentTheme: string;
}

export const loader = async ({ request }: LoaderArgs) => {
  const userId = await requireUser(request);
  const url = new URL(request.url);

  const pageName = url.pathname.replace("/", "");
  return json({ user: { ...userId }, pageName });
};

const IndexLayout = () => {
  // const [, setShowModal] = useState(false);

  const { user } = useLoaderData<typeof loader>();

  // const handleAdder = () => {
  //   setShowModal(true);
  // };

  return (
    <StyledLayout>
      <Header />
      <StyledContent sx={{ flexDirection: "row" }}>
        <Sidebar user={user} />
        <StyledBodyContent noFooter>
          {/* {user && user.id && (
            <PageHeader
              pageName={pageName}
              allowNew
              handleAdder={handleAdder}
            />
          )} */}
          <Outlet />
        </StyledBodyContent>
      </StyledContent>
    </StyledLayout>
  );
};

export default IndexLayout;
