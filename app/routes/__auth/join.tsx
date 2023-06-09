import { useEffect, useRef } from "react";
import type { ActionArgs, LoaderArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useActionData, useSearchParams, useTransition } from "@remix-run/react";
import { CiLogin } from "react-icons/ci";

import { createUserSession, getUserId } from "~/services/session.server";
import { createUser, getUserByEmail } from "~/models/user.server";
import { safeRedirect, validateEmail } from "~/utils";
import { AuthMenu, Button, TextInput, TextLabel } from "~/components";
import {
  StyledFormContainer,
  StyledForm,
  StyledInputContainer,
  StyledInputBox,
  StyledError,
  FlexCenterEnd,
  StyledNewAccountText,
  StyledLink,
  StyledFormBottom,
} from "~/styles/page.styled";
import { Box } from "theme-ui";

export async function loader({ request }: LoaderArgs) {
  const userId = await getUserId(request);
  return json({ userId });
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const redirectTo = safeRedirect(formData.get("redirectTo"), "/");

  if (!validateEmail(email)) {
    return json(
      { errors: { email: "Email is invalid", password: null } },
      { status: 400 }
    );
  }

  if (typeof password !== "string" || password.length === 0) {
    return json(
      { errors: { email: null, password: "Password is required" } },
      { status: 400 }
    );
  }

  if (password.length < 8) {
    return json(
      { errors: { email: null, password: "Password is too short" } },
      { status: 400 }
    );
  }

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return json(
      {
        errors: {
          email: "A user already exists with this email",
          password: null,
        },
      },
      { status: 400 }
    );
  }

  const user = await createUser(email, password);

  return createUserSession({
    request,
    userId: user.id,
    remember: false,
    redirectTo,
  });
}

export const meta: MetaFunction = () => {
  return {
    title: "Sign Up",
  };
};

export default function Join() {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") ?? undefined;
  const actionData = useActionData<typeof action>();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const transition = useTransition();

  useEffect(() => {
    if (actionData?.errors?.email) {
      emailRef.current?.focus();
    } else if (actionData?.errors?.password) {
      passwordRef.current?.focus();
    }
  }, [actionData]);

  return (
    <StyledFormContainer>
      <AuthMenu />
      <Box sx={{ padding: "2rem", width: "100%" }}>
        <StyledForm method="post" noValidate>
          <StyledInputContainer>
            <TextLabel htmlFor="email">Email:</TextLabel>
            <StyledInputBox>
              <TextInput
                ref={emailRef}
                id="email"
                required
                autoFocus={true}
                name="email"
                type="email"
                autoComplete="email"
                aria-invalid={actionData?.errors?.email ? true : undefined}
                aria-describedby="email-error"
              />
              {actionData?.errors?.email && (
                <StyledError id="email-error">
                  {actionData.errors.email}
                </StyledError>
              )}
            </StyledInputBox>
          </StyledInputContainer>
          <StyledInputContainer>
            <TextLabel htmlFor="password">Password:</TextLabel>
            <StyledInputBox>
              <TextInput
                id="password"
                ref={passwordRef}
                name="password"
                type="password"
                autoComplete="new-password"
                aria-invalid={actionData?.errors?.password ? true : undefined}
                aria-describedby="password-error"
              />
              {actionData?.errors?.password && (
                <StyledError id="password-error">
                  {actionData.errors.password}
                </StyledError>
              )}
            </StyledInputBox>
          </StyledInputContainer>
          <input type="hidden" name="redirectTo" value={redirectTo} />
          <FlexCenterEnd sx={{ marginTop: "2rem" }}>
            <Button
              loading={transition.state}
              sx={{ width: "200px" }}
              icon={<CiLogin size={32} />}
            >
              Create Account
            </Button>
          </FlexCenterEnd>
          <StyledFormBottom>
          <StyledNewAccountText>
            Already have an account?{" "}
            <StyledLink
              to={{
                pathname: "/login",
                search: searchParams.toString(),
              }}
            >
              Log in
            </StyledLink>
          </StyledNewAccountText>
        </StyledFormBottom>
        </StyledForm>
      </Box>
    </StyledFormContainer>
  );
}
