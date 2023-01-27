import styled from "@emotion/styled";
import type { ActionArgs, LoaderArgs, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, Link, useActionData, useSearchParams } from "@remix-run/react";
import * as React from "react";

import { verifyLogin } from "~/models/user.server";
import { createUserSession, getUserId } from "~/services/session.server";
import type { StyledTheme } from "~/styles/page.styled";
import { safeRedirect, validateEmail } from "~/utils";

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

export const StyledFormContainer = styled.div<StyledTheme>`
  display: flex;
  width: 100%;
  max-width: 30rem;
  padding: 1rem;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  height: calc(100vh - (92px + 5rem));
`;

export const StyledAuthContainer = styled.div<StyledTheme>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  padding: 0 0.5rem;
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  position: relative;
`;

export const StyledForm = styled(Form)`
  margin-top: 1.5rem;
  width: 100%;
`;

export const StyledInputContainer = styled.div`
  display: block;
`;

export const StyledLabel = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #4a5568;
`;

export const StyledInputBox = styled.div`
  margin-top: 0.25rem;
`;

export const StyledInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
`;

export const StyledError = styled.span`
  display: block;
  padding-top: 0.25rem;
  color: #e53e3e;
`;

export const StyledLink = styled(Link)`
  font-size: 0.875rem;
  color: #4299e1;
  &:hover {
    color: #3182ce;
  }
`;

export const StyledButton = styled.button`
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  color: #fff;
  background-color: #4299e1;
  border-radius: 0.25rem;
  &:hover {
    background-color: #3182ce;
  }

  &:focus {
    background-color: #2b6cb0;
  }

  &:disabled {
    background-color: #cbd5e0;
    color: #a0aec0;
  }

  &:disabled:hover {
    background-color: #cbd5e0;
    color: #a0aec0;
  }

  &:disabled:focus {
    background-color: #cbd5e0;
    color: #a0aec0;
  }
`;

export const FlexCenter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FlexCenterColumn = styled(FlexCenter)`
  flex-direction: column;
`;

export const FlexCenterRow = styled(FlexCenter)`
  flex-direction: row;
`;

export const FlexCenterBetween = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const StyledCheckbox = styled.input`
  width: 1rem;
  height: 1rem;
  color: #4299e1;
  border-color: #e2e8f0;
  border-radius: 0.25rem;
  &:focus {
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
  }
`;

export const StyledNewAccountText = styled.span`
  font-size: 0.875rem;
  text-align: center;
  color: #718096;
`;

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
          <StyledLabel htmlFor="email">Email address</StyledLabel>
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
          <StyledLabel htmlFor="password">Password</StyledLabel>
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
        <StyledButton type="submit">Log in</StyledButton>
        <FlexCenterBetween>
          <FlexCenter>
            <StyledCheckbox id="remember" name="remember" type="checkbox" />
            <StyledLabel htmlFor="remember">Remember me</StyledLabel>
          </FlexCenter>
          <StyledNewAccountText>
            Don't have an account?{" "}
            <StyledLink
              to={{
                pathname: "/join",
                search: searchParams.toString(),
              }}
            >
              Sign up
            </StyledLink>
          </StyledNewAccountText>
        </FlexCenterBetween>
      </StyledForm>
    </StyledFormContainer>
  );
}
