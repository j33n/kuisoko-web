import { useState } from "react";
import { Outlet } from "@remix-run/react";
import { json } from "@remix-run/node";
import type { LoaderArgs } from "@remix-run/node";

import { Header, PageHeader, Sidebar } from "~/components";

import {
  StyledLayout,
  StyledContent,
  StyledBodyContent,
} from "~/components/Layout/Layout.styled";
import { useOptionalUser } from "~/utils";

export interface ILayout {
  children: React.ReactNode;
  setCurrentTheme: (theme: string) => void;
  currentTheme: string;
}

export async function loader({ request }: LoaderArgs) {
  const url = new URL(request.url);

  const pageName = url.pathname.replace("/", "");
  return json({ pageName });
}

const IndexLayout = () => {
  const [, setShowModal] = useState(false);

  const handleAdder = () => {
    setShowModal(true);
  };

  const user = useOptionalUser();

  return (
    <StyledLayout>
      <Header />
      <StyledContent sx={{ flexDirection: "row" }}>
        <Sidebar />
        <StyledBodyContent noFooter>
          {user && (
            <PageHeader
              pageName={"Store xxxxx"}
              allowNew
              handleAdder={handleAdder}
            />
          )}
          <Outlet />
        </StyledBodyContent>
      </StyledContent>
    </StyledLayout>
  );
};

export default IndexLayout;
