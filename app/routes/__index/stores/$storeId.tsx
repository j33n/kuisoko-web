import invariant from "tiny-invariant";
import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { unstable_parseMultipartFormData } from "@remix-run/node";

import { json } from "@remix-run/node";
import { prisma } from "~/db.server";
import { useCatch, useLoaderData, useParams } from "@remix-run/react";
import { s3UploaderHandler } from "~/models/uploader-handler.server";
import { ImageDialog } from "~/components";
import { requireUser } from "~/services/session.server";
import styled from "@emotion/styled";
import { StyledTheme } from "~/styles/page.styled";
import { useState } from "react";


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

// export async function action({ request }: ActionArgs) {
//   const user = await requireUser(request);

//   const formData = await unstable_parseMultipartFormData(
//     request,
//     s3UploaderHandler
//   );

//   const storeIcon = formData.get("storeIcon");

//   // create store
//   const updateStore = await updateStoreIcon({
//     icon: storeIcon,
//   });

//   return null;
// }

export const StyledContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
`;

export const StyledBody = styled.div`
  width: 60vw;
  margin-top: 10vh;
`;

export const StyledContent = styled.div`
  width: 80%;
  margin: 0 auto;
`;

export const StyledSideRight = styled.div<StyledTheme>`
  width: 40%;
  border-left: 1px solid ${({ theme: { colors } }) => colors.buttonBgHover};
`;

export const StyledHeader = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

export const StyledLogoBox = styled.div<StyledTheme>`
  display: flex;
  margin-bottom: 1rem;
`;

export const StyledComment = styled.p`
  font-size: 1rem;
  font-weight: 200;
`;

export default function StoreDetailsRoute() {
  const data = useLoaderData<typeof loader>();

  return (
    <StyledContainer>
      <StyledBody>
        {/* <Cover /> */}
        <StyledContent>
          <StyledLogoBox>
            <ImageDialog />
          </StyledLogoBox>
          <StyledHeader>{data.store.name}</StyledHeader>
          <StyledComment>{data.store.comment}</StyledComment>
        </StyledContent>
      </StyledBody>
      <StyledSideRight>No recent orders</StyledSideRight>
    </StyledContainer>
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
