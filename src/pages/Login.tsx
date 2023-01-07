import React from "react";
import styled from "styled-components";
import { Box, Button, Checkbox, Grid, Input, Label, Link } from "../components";
import { Block } from "../styles/index.styled";
import { Title } from "../styles/studio.styled";

const HEADER_SIZE = 132;

export const StyledContainer = styled(Block)`
  height: calc(100% - ${HEADER_SIZE}px);
  width: 100%;
  justify-content: flex-start;
  background: ${({ theme: { colors } }) => colors.background};
  padding-top: 5rem;
`;

export const StyledLogin = styled(Box)`
  width: 60%;
  border-radius: 4px;
  border: 1px solid ${({ theme: { colors } }) => colors.border};
  padding-top: 1rem;
`;

export const StyledTitle = styled(Title)`
  color: ${({ theme: { colors } }) => colors.text};
  text-align: center;
`;

export const LoginBlock = styled(Box)`
  width: 100%;
  padding: 1rem;

  & > div {
    margin-bottom: 1rem;

    & label {
      justify-content: center;
      align-items: center;
    }
  }
`;

export const LoginButton = styled(Block)`
  padding: 1rem 0;

  & > button {
    width: 50%;
    margin: auto 0;
  }
`;

export const RememberMeBlock = styled(Box)`
  width: 100%;

  & > label {
    justify-content: center;
    align-items: center;
  }
`;

export const ResetPasswordBlock = styled(Box)`
  width: 100%;
  padding: 1rem 0;
  text-align: center;

  & > a {
    color: ${({ theme: { colors } }) => colors.nav};
    text-decoration: none;
  }
`;

const renderLoginForm = () => {
  return (
    <LoginBlock>
      <Grid columns={[2, "1fr 2fr"]} gap={1}>
        <Label htmlFor="username">Username:</Label>
        <Input type="text" placeholder="Username" />
      </Grid>
      <Grid columns={[2, "1fr 2fr"]} gap={1}>
        <Label htmlFor="password">Password:</Label>
        <Input type="password" placeholder="Password" />
      </Grid>
    </LoginBlock>
  );
};

export default function Login() {
  return (
    <StyledContainer>
      <StyledLogin>
        <StyledTitle>Login 🔒</StyledTitle>
        {renderLoginForm()}
        <RememberMeBlock>
          <Label htmlFor="rememberMe">
            <Checkbox id="rememberMe" checked={false} onChange={() => {}} />
            Remember me
          </Label>
        </RememberMeBlock>
        <LoginButton>
          <Button text="Login">Login</Button>
        </LoginButton>
        <ResetPasswordBlock>
          <Link href="#">Forgot password?</Link>
        </ResetPasswordBlock>
      </StyledLogin>
    </StyledContainer>
  );
}
