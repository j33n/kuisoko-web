import { useRef, useEffect } from "react";
import type { ActionArgs, LoaderArgs, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import {
  useActionData,
  useSearchParams,
  useTransition,
} from "@remix-run/react";

import { CiLogin } from "react-icons/ci";
import { AuthMenu, Button, TextInput, TextLabel } from "~/components";

import { verifyLogin } from "~/models/user.server";
import { createUserSession, getUserId } from "~/services/session.server";
import { safeRedirect, validateEmail } from "~/utils";

import {
  StyledFormContainer,
  StyledForm,
  StyledInputContainer,
  StyledInputBox,
  StyledError,
  FlexCenterEnd,
  FlexCenter,
  StyledNewAccountText,
  StyledLink,
  StyledFormBottom,
  FlexCenterColumn,
} from "~/styles/page.styled";
import { Box, Checkbox } from "theme-ui";
import styled from "@emotion/styled";

// interface SocialButtonProps {
//   provider: SocialsProvider;
//   label: string;
// }

export const StyledSocialForm = styled(FlexCenterColumn)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;

  form {
    width: 100%;
  }
`;

export async function loader({ request }: LoaderArgs) {
  const userId = await getUserId(request);

  if (userId) return redirect("/stores");
  return json({ userId });
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const redirectTo = safeRedirect(formData.get("redirectTo"), "/");
  const remember = formData.get("remember");

  if (!validateEmail(email)) {
    return json(
      { errors: { email: "Email is required", password: null } },
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

// const SocialButton: React.FC<SocialButtonProps> = ({ provider, label }) => (
//   <Form action={`/socials/${provider}`} method="post">
//     <Button>{label}</Button>
//   </Form>
// );

export default function LoginPage() {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/stores";
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
            <Button
              sx={{ width: "200px" }}
              icon={<CiLogin size={32} />}
              loading={transition.state}
            >
              Log in
            </Button>
          </FlexCenterEnd>
          <StyledFormBottom>
            <FlexCenter sx={{ justifyContent: "flex-start" }}>
              <TextLabel>
                <Checkbox name="remember" defaultChecked={false} />
                Remember me
              </TextLabel>
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
        </StyledForm>
      </Box>
      {/* <StyledSocialForm>
        <SocialButton
          provider={SocialsProvider.GOOGLE}
          label="Login with Google"
        />
        <SocialButton
          provider={SocialsProvider.FACEBOOK}
          label="Login with Facebook"
        />
      </StyledSocialForm> */}
    </StyledFormContainer>
  );
}
