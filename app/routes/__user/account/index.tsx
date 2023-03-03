import type { ActionFunction, LoaderArgs, MetaFunction } from "@remix-run/node";

import { json } from "@remix-run/node";
import { z } from "zod";
import {
  Form,
  useActionData,
  useLoaderData,
  useTransition,
} from "@remix-run/react";
import { CiUser, CiMobile1 } from "react-icons/ci";

import { Editable, ImageDialog, Loader } from "~/components";
import { requireUser } from "~/services/session.server";
import { useRef } from "react";

import {
  StyledBody,
  StyledContainer,
  StyledContentWrapper,
  StyledLogoBox,
  StyledOverlay,
} from "~/styles/stores/singleStore.styled";
import { Paragraph } from "theme-ui";
import styled from "@emotion/styled";
import { FormContainer } from "~/styles/page.styled";
import { updateUser } from "~/models/user.server";

export type StyledParagraphType = {
  disabled?: boolean;
};

export const StyledParagraph = styled(Paragraph)<StyledParagraphType>`
  font-size: 1.5rem;
  font-weight: 500;
  margin-bottom: 1rem;
  color: ${({ theme: { colors }, disabled }) =>
    disabled ? colors.gray9 : colors.text};
`;

export const meta: MetaFunction = () => ({
  title: "Edit my info - Kuisoko",
});

export async function loader({ request }: LoaderArgs) {
  const user = await requireUser(request);
  return json({ user });
}

export const action: ActionFunction = async ({ request }) => {
  const user = await requireUser(request);
  const formPayload = Object.fromEntries(await request.formData());
  const userDetailsSchema = z.object({
    name: z.string().optional(),
    phone: z.string().optional(),
  });
  try {
    userDetailsSchema.parse(formPayload);
    const data = {
      name: (formPayload.name as string) || user.name,
      phone: (formPayload.phone as string) || user.phone,
    };
    return await updateUser(user.id, data);
  } catch (error) {
    // TODO: Notify the user about the form errors
    return error;
  }
};

export default function StoreDetailsRoute() {
  const { user } = useLoaderData<typeof loader>();

  console.log("----------->>>>", user);
  

  const submitBtnRef = useRef<HTMLButtonElement>(null);
  const transition = useTransition();
  const actionData = useActionData<typeof action>();
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
        <StyledContentWrapper>
          <Form method="post">
            <FormContainer>
              <StyledLogoBox>
                <ImageDialog tabSize="75%" triggerIcon={user.profile} />
              </StyledLogoBox>
              <Editable
                icon={<CiUser size={24} />}
                defaultValue={user.name || ""}
                fontSize="sm"
                name="name"
                onSave={() => submitBtnRef.current?.click()}
                placeholder="Name...."
              />
              <Editable
                icon={<CiMobile1 size={24} />}
                defaultValue={user.phone || ""}
                fontSize="sm"
                name="phone"
                onSave={() => submitBtnRef.current?.click()}
                placeholder="Phone"
              />
              <button type="submit" ref={submitBtnRef} hidden>
                Save
              </button>
            </FormContainer>
          </Form>
        </StyledContentWrapper>
      </StyledBody>
    </StyledContainer>
  );
}

// TODO: remove padding .ql-editor, Handle form submission errors
