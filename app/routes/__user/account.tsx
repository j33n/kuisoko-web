import invariant from "tiny-invariant";
import type { ActionArgs, LinksFunction, LoaderArgs } from "@remix-run/node";
import { unstable_parseMultipartFormData } from "@remix-run/node";

import { json } from "@remix-run/node";
import { prisma } from "~/db.server";
import {
  Form,
  useActionData,
  useCatch,
  useLoaderData,
  useParams,
  useTransition,
} from "@remix-run/react";
import { s3UploaderHandler } from "~/models/uploader-handler.server";
import { Builder, Editable, ImageDialog, Loader } from "~/components";
import { requireUser } from "~/services/session.server";
import { useRef } from "react";

import {
  StyledBody,
  StyledContainer,
  StyledContent,
  StyledLogoBox,
  StyledOverlay,
} from "~/styles/stores/singleStore.styled";

export async function loader({ request }: LoaderArgs) {
  const user = await requireUser(request);
  return json({ user });
}

export async function action({ params, request }: ActionArgs) {
  const formData = await request.formData();
  const user = await requireUser(request);

  return json({ user });
}

export default function StoreDetailsRoute() {
  const { user } = useLoaderData<typeof loader>();

  const submitBtnRef = useRef<HTMLButtonElement>(null);
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
            <ImageDialog tabsWidth="75%" triggerIcon={user.profile} />
          </StyledLogoBox>
          <Form method="post" action={`/profile`}>
            <Editable
              defaultValue={user.name}
              fontSize="lg"
              name="storeName"
              onSave={() => submitBtnRef.current?.click()}
            />
            <Editable
              defaultValue={user.email}
              sx={{ marginTop: "1rem" }}
              name="storeComment"
              onSave={() => submitBtnRef.current?.click()}
            />
            <button type="submit" ref={submitBtnRef} hidden>
              Save
            </button>
          </Form>
        </StyledContent>
      </StyledBody>
      {/* <StyledSideRight>No recent orders 😌</StyledSideRight> */}
    </StyledContainer>
  );
}
