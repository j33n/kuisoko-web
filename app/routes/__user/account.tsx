import type { ActionArgs, LoaderArgs } from "@remix-run/node";

import { json } from "@remix-run/node";
import {
  Form,
  useLoaderData,
  useTransition,
} from "@remix-run/react";

import { Editable, ImageDialog, Loader } from "~/components";
import { requireUser } from "~/services/session.server";
import { useRef } from "react";

import {
  StyledBody,
  StyledContainer,
  StyledContent,
  StyledLogoBox,
  StyledOverlay,
} from "~/styles/stores/singleStore.styled";
import { Paragraph } from "theme-ui";
import styled from "@emotion/styled";

export type StyledParagraphType = {
  disabled?: boolean;
}

export const StyledParagraph = styled(Paragraph)<StyledParagraphType>`
  font-size: 1.5rem;
  font-weight: 500;
  margin-bottom: 1rem;
  color: ${({ theme: { colors }, disabled }) =>
    disabled ? colors.gray9 : colors.text};
`;

export async function loader({ request }: LoaderArgs) {
  const user = await requireUser(request);
  return json({ user });
}

export async function action({ request }: ActionArgs) {
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
          <Form method="post" action={`/profile`}>
            <StyledLogoBox>
              <ImageDialog tabSize="75%" triggerIcon={user.profile} />
            </StyledLogoBox>
            <Editable
              defaultValue={user.name}
              fontSize="lg"
              name="userName"
              onSave={() => submitBtnRef.current?.click()}
            />
            {user.name ? (
              <Editable
                defaultValue={user.name}
                fontSize="lg"
                name="userEmail"
                onSave={() => submitBtnRef.current?.click()}
              />
            ) : (
              <StyledParagraph disabled>names</StyledParagraph>
            )}
            <p>{user.email}</p>
            <button type="submit" ref={submitBtnRef} hidden>
              Save
            </button>
          </Form>
        </StyledContent>
      </StyledBody>
    </StyledContainer>
  );
}
