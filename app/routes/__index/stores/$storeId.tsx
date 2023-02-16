import invariant from "tiny-invariant";
import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { unstable_parseMultipartFormData } from "@remix-run/node";

import { json } from "@remix-run/node";
import { prisma } from "~/db.server";
import { Form, useCatch, useLoaderData, useParams } from "@remix-run/react";
import { s3UploaderHandler } from "~/models/uploader-handler.server";
import { Editable, ImageDialog } from "~/components";
import { requireUser } from "~/services/session.server";
import styled from "@emotion/styled";
import type { StyledTheme } from "~/styles/page.styled";
import { useRef, useState } from "react";
import { updateStoreComment, updateStoreName } from "~/models/store.server";

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
  padding-top: 1rem;
  padding-left: 0.5rem;
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

export async function action({ params, request }: ActionArgs) {
  const formData = await request.formData();
  const user = await requireUser(request);

  const { storeId } = params;

  const storeName = formData.get("storeName");
  const storeComment = formData.get("storeComment");

  console.log(storeComment, storeName, params, user, "💎");

  let store;

  if (storeName && typeof storeName === "string" && storeId) {
    store = await updateStoreName({
      id: storeId,
      name: storeName,
      userId: user.id,
    });
  }

  if (storeComment && typeof storeComment === "string" && storeId) {
    store = await updateStoreComment({
      id: storeId,
      comment: storeComment,
      userId: user.id,
    });
  }

  return store;
}

export default function StoreDetailsRoute() {
  const data = useLoaderData<typeof loader>();
  //TODO: check store is updated and clear state
  const [newStoreName, setNewStoreName] = useState("");
  const [newStoreComment, setNewStoreComment] = useState("");

  const submitBtnRef = useRef<HTMLButtonElement>(null);

  const handleSaveStoreName = (val: string) => {
    submitBtnRef.current?.click();
    setNewStoreName(val);
  };

  const handleSaveStoreComment = (val: string) => {
    submitBtnRef.current?.click();
    setNewStoreComment(val);
  };

  return (
    <StyledContainer>
      <StyledBody>
        {/* <Cover /> */}
        <StyledContent>
          <StyledLogoBox>
            <ImageDialog tabsWidth="75%" />
          </StyledLogoBox>
          <Form method="post" action={`/stores/${data.store.id}`}>
            <Editable
              defaultValue={newStoreName || data.store.name}
              fontSize="lg"
              name="storeName"
              onSave={handleSaveStoreName}
            />
            <Editable
              defaultValue={newStoreComment || data.store.comment}
              sx={{ marginTop: "1rem" }}
              name="storeComment"
              onSave={handleSaveStoreComment}
            />
            <button type="submit" ref={submitBtnRef} hidden>
              Save
            </button>
          </Form>
        </StyledContent>
      </StyledBody>
      <StyledSideRight>No recent orders 😌</StyledSideRight>
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
