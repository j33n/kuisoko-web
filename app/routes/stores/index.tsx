import React from "react";
import { useLoaderData } from "@remix-run/react";
import styled from "@emotion/styled";

import type { StyledTheme } from "~/components/Layout/Layout.styled";
import PageHeader from "~/components/PageHeader/PageHeader";
import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { singularize } from "~/utils";
import { Modal } from "~/components";

export const StyledPage = styled.div<StyledTheme>`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  position: relative;
  background: ${({ theme: { colors } }) => colors.background};
  color: ${({ theme: { colors } }) => colors.text};
`;

export async function loader({ request }: LoaderArgs) {
  const url = new URL(request.url);

  const page = url.pathname.replace("/", "");

  return json({
    pageName: singularize(page),
  });
}

export default function Stores() {
  const data = useLoaderData<typeof loader>();
  const [showModal, setShowModal] = React.useState(false);

  const handleAdder = () => {
    setShowModal(true);
  };

  return (
    <StyledPage>
      <PageHeader pageName={data.pageName} allowNew handleAdder={handleAdder} />
      {showModal && (
        <Modal
          title="New Store"
          open={showModal}
          onClose={() => setShowModal(false)}
          modalAnimation="Unfolding"
          onConfirm={() => setShowModal(false)}
        >
        New Store is about to be added t the db, ....</Modal>
      )}
    </StyledPage>
  );
}
