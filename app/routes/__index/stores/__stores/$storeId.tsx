import invariant from "tiny-invariant";
import { cssBundleHref } from "@remix-run/css-bundle";
import { json } from "@remix-run/node";

import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { prisma } from "~/db.server";
import {
  Form,
  Outlet,
  useCatch,
  useLoaderData,
  useParams,
  useSubmit,
  useTransition,
} from "@remix-run/react";
import {
  Builder,
  Editable,
  ErrorView,
  ImageDialog,
  ItemView,
  Loader,
  NewItem,
} from "~/components";
import { requireUser } from "~/services/session.server";
import { useEffect, useRef, useState } from "react";
import {
  updateStoreBody,
  updateStoreComment,
  updateStoreName,
} from "~/models/store.server";

import {
  StyledBody,
  StyledContainer,
  StyledContentWrapper,
  StyledItemListHeader,
  StyledItemLister,
  StyledLogoBox,
  StyledOverlay,
} from "~/styles/stores/singleStore.styled";

import { CiShop, CiStar } from "react-icons/ci";
import DropDownMenu from "~/components/Layout/DropDownMenu/DropDownMenu";
import {
  StyledItem,
  StyledRightSlot,
} from "~/components/Layout/DropDownMenu/DropDownMenu.styled";
import { useTranslation } from "react-i18next";

import stylesheetQuill from "~/styles/quill.snow.css";
import emojiPickerStyles from "~/styles/emoji-picker.css";
import { getStoreItems } from "~/models/items.server";

export const links: any = () => {
  return [
    { rel: "stylesheet", href: stylesheetQuill },
    { rel: "stylesheet", href: cssBundleHref },
    { rel: "stylesheet", href: emojiPickerStyles },
  ];
};

export const loader = async ({ params, request }: LoaderArgs) => {
  const { storeId } = params;
  invariant(storeId, "Missing store id");
  const user = await requireUser(request);

  const store = await prisma.store.findFirst({
    where: {
      id: storeId,
    },
  });

  let items;

  if (store) {
    items = await getStoreItems(storeId, user.id);
  }

  if (!store) {
    throw new Response("Oops, Store not found", { status: 404 });
  }

  return json({ store, items });
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

  const { _action, storeName, storeComment, storeBody } =
    Object.fromEntries(formData);

  let store;

  if (_action === "updateStoreName") {
    if (storeName && typeof storeName === "string" && storeId) {
      store = await updateStoreName({
        id: storeId,
        name: storeName,
        userId: user.id,
      });
    }
  }

  if (_action === "updateStoreComment") {
    if (storeComment && typeof storeComment === "string" && storeId) {
      store = await updateStoreComment({
        id: storeId,
        comment: storeComment,
        userId: user.id,
      });
    }
  }

  if (_action === "updateStoreBody") {
    if (storeBody && typeof storeBody === "string" && storeId) {
      store = await updateStoreBody({
        id: storeId,
        body: storeBody,
        userId: user.id,
      });
    }
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

  const { t } = useTranslation();

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
        {t("favorite")}
        <StyledRightSlot>
          <CiStar />
        </StyledRightSlot>
      </StyledItem>
    </Form>
  );
};

export default function StoreDetailsRoute() {
  const { items, store } = useLoaderData<typeof loader>();
  const saveNameBtnRef = useRef<HTMLButtonElement>(null);
  const saveCommentBtnRef = useRef<HTMLButtonElement>(null);
  const saveBodyBtnRef = useRef<HTMLButtonElement>(null);

  const [textEditor, setTextEditor] = useState<any>("");
  const transition = useTransition();

  useEffect(() => {
    setTextEditor(store.body);
  }, [store]);

  const defaultTriggerIcon = <CiShop />;

  return (
    <StyledContainer>
      <StyledBody>
        {(transition.state === "loading" ||
          transition.state === "submitting") && (
          <StyledOverlay>
            <Loader sx={{ zIndex: 2 }} />
          </StyledOverlay>
        )}
        <StyledContentWrapper
          style={{ borderRadius: "0.5rem 0.5rem 0 0", borderBottom: 0 }}
        >
          <StyledLogoBox>
            <ImageDialog
              tabSize="75%"
              triggerIcon={store.icon}
              defaultTriggerIcon={defaultTriggerIcon}
            />
          </StyledLogoBox>
          <DropDownMenu>
            <FavoriteForm storeId={store.id} />
          </DropDownMenu>
          <Form method="post" action={`/stores/${store.id}`}>
            <Editable
              defaultValue={store.name}
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
              defaultValue={store.comment}
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
          <Form method="post">
            <Builder
              onSubmit={() => saveBodyBtnRef.current?.click()}
              onChange={setTextEditor}
              value={textEditor}
            />
            <input type="hidden" name="storeBody" value={textEditor} />
            <button
              type="submit"
              aria-label="update store body content"
              name="_action"
              value="updateStoreBody"
              ref={saveBodyBtnRef}
              hidden
            >
              Save
            </button>
          </Form>
        </StyledContentWrapper>
        <StyledContentWrapper style={{ borderRadius: "0 0 0.5rem 0.5rem" }}>
          <StyledItemListHeader>
            {items && items.length > 0 ? (
              <span>
                {items.length} {items.length === 1 ? "item" : "items"}
              </span>
            ) : (
              "No items in store"
            )}
            {/* TODO: issue is here */}
            <NewItem isNewItem />
          </StyledItemListHeader>
          {items && items.length > 0 && (
            <StyledItemLister>
              {items.map((item) => {
                return <ItemView id={item.id} key={item.id} />;
              })}
            </StyledItemLister>
          )}
        </StyledContentWrapper>
        {/*TODO:  move item list here */}
        <Outlet />
      </StyledBody>
    </StyledContainer>
  );
}

export function ErrorBoundary({ error }: any) {
  const caught = useCatch();
  const params = useParams();

  if (error) {
    return <ErrorView error={error} />;
  }

  if (caught && caught.status === 404) {
    return <div>{`Store ${params.storeId}" not found`}</div>;
  }

  if (caught && caught.status) {
    throw new Error(`Unexpected caught response with status: ${caught.status}`);
  }
}
