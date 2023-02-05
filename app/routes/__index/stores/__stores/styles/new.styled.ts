import styled from "@emotion/styled";
import { Form } from "@remix-run/react";
import type { StyledTheme } from "~/styles/page.styled";
import { StyledInputs } from "~/components/Forms/TextInput";

export const StyledCreateStore = styled.div<StyledTheme>`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
  align-items: center;
`;

export const StyledImg = styled.img<StyledTheme>`
  max-height: 300px;
  opacity: 0.7;
`;

export const StyledForm = styled(Form)<StyledTheme>`
  width: 50%;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid ${({ theme: { colors } }) => colors.buttonBgHover};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  @media (max-width: 768px) {
    width: 100%;
    padding: 0;
    margin: 0.5rem;
  }
`;

export const StyledTextArea = styled.textarea`
  ${StyledInputs}
`;

export const StyledButton = styled.button<StyledTheme>`
  border: none;
  border-radius: 0.5rem;
  padding: 0.5rem;
  font-size: ${({ theme: { fontSizes } }) => fontSizes[1]};
  font-weight: 600;
  background-color: transparent;
  border: 1px solid ${({ theme: { colors } }) => colors.nav};
  color: ${({ theme: { colors } }) => colors.nav};
  min-width: 30%;
  cursor: pointer;

  &:hover,
  &:focus {
    color: ${({ theme: { colors } }) => colors.white};
    background-color: ${({ theme: { colors } }) => colors.nav};
  }
`;

export const StyledBtnContainer = styled.div<StyledTheme>`
  display: flex;
  width: 100%;
  justify-content: flex-end;
`;

export const StyledTitle = styled.div<StyledTheme>`
  font-size: ${({ theme: { fontSizes } }) => fontSizes[1]};
  font-weight: 200;
  text-transform: uppercase;
`;

export const StyledLogoBox = styled.div<StyledTheme>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
  max-width: 15vw;
`;

export const StyledImageHolder = styled.div<StyledTheme>`
  display: flex;
  justify-content: center;
  align-items: center;
  align-items: center;
  background-color: ${({ theme: { colors } }) => colors.buttonBgHover};
  border-radius: 0.5rem;
  padding: 0.5rem;

  img {
    max-width: 5rem;
  }
`;

export const StyledInputHolder = styled.div<StyledTheme>`
  display: flex;
  justify-content: space-between;
  width: 100%;
  flex-wrap: wrap;
`;