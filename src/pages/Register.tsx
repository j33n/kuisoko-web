import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { Box, Button, Grid, Input, Label } from "../components";
import { Block } from "../styles/index.styled";
import { Title } from "../styles/studio.styled";
import { StyledLogin } from "./Login";

const HEADER_SIZE = 132;

export const StyledContainer = styled(Block)`
  height: calc(100% - ${HEADER_SIZE}px);
  width: 100%;
  justify-content: flex-start;
  background: ${({ theme: { colors } }) => colors.background};
  padding-top: 5rem;
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

export default function Register() {
  return (
    <StyledContainer>
      <StyledLogin>
        <StyledTitle> Create account 🥳</StyledTitle>
        {renderLoginForm()}
        <LoginButton>
          <Button text="Register">Register</Button>
        </LoginButton>
        <Link to="/login">Already have an account? Login here</Link>
      </StyledLogin>
    </StyledContainer>
  );
}
