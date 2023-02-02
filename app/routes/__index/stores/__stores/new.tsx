import styled from "@emotion/styled";
import { Form } from "@remix-run/react";
import type { StyledTheme } from "~/styles/page.styled";

// import shopImage from "~/assets/images/shop.svg";
// import { ImageContainer } from "~/components";

import addStoreLogo from "~/assets/images/addStoreLogo.svg";
import { css } from "@emotion/react";

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

export const StyledInputs = ({ theme: { colors } }: any) => css`
  font-size: 16px;
  padding: 0.5rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  color: ${colors.text};
  background-color: ${colors.buttonBgHover};
  border: 1px solid ${colors.text};

  &:focus {
    outline: none;
    border: 1px solid ${colors.nav};
  }
`;

export const StyledLabel = styled.label<StyledTheme>`
  font-size: ${({ theme: { fontSizes } }) => fontSizes[1]};
  color: rgb(107, 114, 128);
`;

export const StyledInput = styled.input<StyledTheme>`
  ${StyledInputs}
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
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
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

export const StyledInputContainer = styled.div<StyledTheme>`
  display: flex;
  flex-direction: column;
`;

export const StyledInputHolder = styled.div<StyledTheme>`
  display: flex;
  justify-content: space-between;
`;

export default function NewStoreRoute() {
  return (
    <StyledCreateStore>
      <StyledForm className="flex flex-col">
        <StyledLabel htmlFor="storeName">Logo:</StyledLabel>
        <StyledInputHolder>
          <StyledLogoBox>
            <StyledImageHolder>
              <img src={addStoreLogo} alt="add store logo" />
              <StyledInput type="file" name="storeLogo" id="storeLogo" hidden />
            </StyledImageHolder>
          </StyledLogoBox>
          <StyledInputContainer>
            <StyledLabel htmlFor="storeName">Name:</StyledLabel>
            <StyledInput type="text" name="storeName" id="storeName" />
          </StyledInputContainer>
          <StyledInputContainer>
            <StyledLabel htmlFor="storeAddress">Address:</StyledLabel>
            <StyledInput type="text" name="storeAddress" id="storeAddress" />
          </StyledInputContainer>
        </StyledInputHolder>
        <StyledLabel htmlFor="storeDescription">Description:</StyledLabel>
        <StyledTextArea
          name="storeDescription"
          id="storeDescription"
          rows={5}
          cols={50}
        />
        <StyledBtnContainer>
          <StyledButton type="submit">Create Store</StyledButton>
        </StyledBtnContainer>
      </StyledForm>

      {/* TODO: investigate using images so avoid naked pages */}
      {/* <ImageContainer align="bottomRight">
        <StyledImg src={shopImage} alt="shop placeholder" />
      </ImageContainer> */}
    </StyledCreateStore>
  );
}
