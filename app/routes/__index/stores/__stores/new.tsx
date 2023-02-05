import React from "react";
// import shopImage from "~/assets/images/shop.svg";
// import { ImageContainer } from "~/components";

import addStoreLogo from "~/assets/images/addStoreLogo.svg";
import { StyledCreateStore,StyledForm,StyledLabel,StyledInputHolder,StyledLogoBox,StyledImageHolder,StyledInput,StyledInputContainer,StyledTextArea,StyledBtnContainer,StyledButton } from "./styles/new.styled";

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
        <StyledLabel htmlFor="storeComment">Comment:</StyledLabel>
        <StyledTextArea
          name="storeComment"
          id="storeComment"
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
