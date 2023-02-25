import invariant from "tiny-invariant";
import type { ActionArgs, LinksFunction, LoaderArgs } from "@remix-run/node";
import { unstable_parseMultipartFormData } from "@remix-run/node";
import { useFetcher } from "@remix-run/react";

import { json } from "@remix-run/node";
import { prisma } from "~/db.server";
import {
  Form,
  useCatch,
  useLoaderData,
  useParams,
  useSubmit,
  useTransition,
} from "@remix-run/react";
import { s3UploaderHandler } from "~/models/uploader-handler.server";
import { Builder, Editable, ImageDialog, Loader } from "~/components";
import { requireUser } from "~/services/session.server";
import { useRef, useState } from "react";
import { updateStoreComment, updateStoreName } from "~/models/store.server";

import {
  StyledBody,
  StyledContainer,
  StyledContent,
  StyledLogoBox,
  StyledOverlay,
} from "~/styles/stores/singleStore.styled";

import stylesheetQuill from "~/styles/quill.bubble.css";
import { CiStar } from "react-icons/ci";
import DropDownMenu from "~/components/Layout/DropDownMenu/DropDownMenu";
import {
  StyledItem,
  StyledRightSlot,
} from "~/components/Layout/DropDownMenu/DropDownMenu.styled";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesheetQuill }];
};

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

// TODO: move this to separate resource route
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

  const { _action, storeName, storeComment } = Object.fromEntries(formData);

  let store;

  if (_action === "updateStoreName") {
    console.log("_+________________🎉", _action);
    
    if (storeName && typeof storeName === "string" && storeId) {
      store = await updateStoreName({
        id: storeId,
        name: storeName,
        userId: user.id,
      });
    }
  }

  if (_action === "updateStoreComment") {
    console.log("_+________________🎉", _action);
    if (storeComment && typeof storeComment === "string" && storeId) {
      store = await updateStoreComment({
        id: storeId,
        comment: storeComment,
        userId: user.id,
      });
    }
  }

  if (_action === "updateStoreContent") {
    console.log(_action);
    console.log("upate store content");
  }

  if (_action === "uploadStoreImage") {
    console.log(_action);
    console.log("upload store image");
  }

  return json({ store });
}

export type FavoriteFormProps = {
  storeId: string;
};

export const FavoriteForm = ({ storeId }: FavoriteFormProps) => {
  const [isStoreFavorite, setIsStoreFavorite] = useState<"on" | "off">("off");
  const submit = useSubmit();

  const handleSubmitFav = () => {
    setIsStoreFavorite(isStoreFavorite === "off" ? "on" : "off");

    let formData = new FormData();
    formData.append("favorite", isStoreFavorite === "off" ? "on" : "off");
    formData.append("storeId", storeId);

    submit(formData, { method: "post", action: "/forms/favorites" });
  };

  return (
    <Form method="post">
      <StyledItem onClick={handleSubmitFav}>
        Add to Favorites
        <StyledRightSlot>
          <CiStar />
        </StyledRightSlot>
      </StyledItem>
    </Form>
  );
};

export default function StoreDetailsRoute() {
  const data = useLoaderData<typeof loader>();
  const saveNameBtnRef = useRef<HTMLButtonElement>(null);
  const saveCommentBtnRef = useRef<HTMLButtonElement>(null);
  const transition = useTransition();

  return (
    <StyledContainer>
      <StyledBody>
        {/* <Cover /> */}
        {(transition.state === "loading" ||
          transition.state === "submitting") && (
          <StyledOverlay>
            <Loader sx={{ zIndex: 2 }} />
          </StyledOverlay>
        )}
        <StyledContent>
          <StyledLogoBox>
            <ImageDialog tabsWidth="75%" triggerIcon={data.store.icon} />
          </StyledLogoBox>
          <DropDownMenu>
            <FavoriteForm storeId={data.store.id} />
          </DropDownMenu>
          <Form method="post" action={`/stores/${data.store.id}`}>
            <Editable
              defaultValue={data.store.name}
              fontSize="lg"
              name="storeName"
              onSave={() => saveNameBtnRef.current?.click()}
            />
            <button
              type="submit"
              aria-label="update store"
              name="_action"
              value="updateStoreName"
              ref={saveNameBtnRef}
              hidden
            >
              Save
            </button>
            <Editable
              defaultValue={data.store.comment}
              sx={{ marginTop: "1rem" }}
              name="storeComment"
              onSave={() => saveCommentBtnRef.current?.click()}
            />
            <button
              type="submit"
              aria-label="update store"
              name="_action"
              value="updateStoreComment"
              ref={saveCommentBtnRef}
              hidden
            >
              Save
            </button>
          </Form>
          <Builder />
        </StyledContent>
      </StyledBody>
      {/* TODO: make this slidable */}
      {/* <StyledSideRight>No recent orders 😌</StyledSideRight> */}
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
