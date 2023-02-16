import invariant from "tiny-invariant";
import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { unstable_parseMultipartFormData } from "@remix-run/node";

import { json } from "@remix-run/node";
import { prisma } from "~/db.server";
import { Form, useCatch, useLoaderData, useParams } from "@remix-run/react";
import { s3UploaderHandler } from "~/models/uploader-handler.server";
import { Editable, ImageDialog } from "~/components";
import { requireUser } from "~/services/session.server";
import { useRef, useState } from "react";
import { updateStoreComment, updateStoreName } from "~/models/store.server";
import { StyledBody, StyledContainer, StyledContent, StyledLogoBox, StyledSideRight } from "~/styles/stores/singleStore.styled";

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

export async function action({ params, request }: ActionArgs) {
  const formData = await request.formData();
  const user = await requireUser(request);

  const { storeId } = params;

  const storeName = formData.get("storeName");
  const storeComment = formData.get("storeComment");

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
