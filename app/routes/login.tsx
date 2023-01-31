import type { ActionArgs, LoaderArgs, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useActionData, useSearchParams } from "@remix-run/react";
import * as React from "react";

import { CiLogin } from "react-icons/ci";
import { Button } from "~/components";

import { verifyLogin } from "~/models/user.server";
import { createUserSession, getUserId } from "~/services/session.server";
import { safeRedirect, validateEmail } from "~/utils";

import {
  StyledFormContainer,
  StyledForm,
  StyledInputContainer,
  StyledLabel,
  StyledInputBox,
  StyledInput,
  StyledError,
  FlexCenterEnd,
  FlexCenter,
  StyledCheckbox,
  StyledNewAccountText,
  StyledLink,
  StyledFormBottom,
} from "~/styles/page.styled";

export async function loader({ request }: LoaderArgs) {
  const userId = await getUserId(request);
  if (userId) return redirect("/");
  return json({});
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const redirectTo = safeRedirect(formData.get("redirectTo"), "/");
  const remember = formData.get("remember");

  if (!validateEmail(email)) {
    return json(
      { errors: { email: "Email is invalid", password: null } },
      { status: 400 }
    );
  }

  if (typeof password !== "string" || password.length === 0) {
    return json(
      { errors: { password: "Password is required", email: null } },
      { status: 400 }
    );
  }

  if (password.length < 8) {
    return json(
      { errors: { password: "Password is too short", email: null } },
      { status: 400 }
    );
  }

  const user = await verifyLogin(email, password);

  if (!user) {
    return json(
      { errors: { email: "Invalid email or password", password: null } },
      { status: 400 }
    );
  }

  return createUserSession({
    request,
    userId: user.id,
    remember: remember === "on" ? true : false,
    redirectTo,
  });
}

export const meta: MetaFunction = () => {
  return {
    title: "Login",
  };
};

export default function LoginPage() {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/notes";
  const actionData = useActionData<typeof action>();
  const emailRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (actionData?.errors?.email) {
      emailRef.current?.focus();
    } else if (actionData?.errors?.password) {
      passwordRef.current?.focus();
    }
  }, [actionData]);

  return (
    <StyledFormContainer>
      <StyledForm method="post" noValidate>
        <StyledInputContainer>
          <StyledLabel htmlFor="email">Email/Phone:</StyledLabel>
          <StyledInputBox>
            <StyledInput
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
          <StyledLabel htmlFor="password">Password:</StyledLabel>
          <StyledInputBox>
            <StyledInput
              id="password"
              ref={passwordRef}
              name="password"
              type="password"
              autoComplete="current-password"
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
          <Button sx={{ width: "200px" }} icon={<CiLogin size={32} />}>
            Log in
          </Button>
        </FlexCenterEnd>
      </StyledForm>
      <StyledFormBottom>
        <FlexCenter sx={{ justifyContent: "flex-start" }}>
          <StyledCheckbox id="remember" name="remember" type="checkbox" />
          <StyledLabel sx={{ justifyContent: "center" }} htmlFor="remember">
            Remember me
          </StyledLabel>
        </FlexCenter>
        <StyledNewAccountText>
          Don't have an account?{" "}
          <StyledLink
            to={{
              pathname: "/join",
              search: searchParams.toString(),
            }}
          >
            Sign Up
          </StyledLink>
        </StyledNewAccountText>
      </StyledFormBottom>
    </StyledFormContainer>
  );
}
