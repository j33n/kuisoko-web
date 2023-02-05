import addStoreLogo from "~/assets/images/addStoreLogo.svg";
import {
  StyledCreateStore,
  StyledForm,
  StyledInputHolder,
  StyledLogoBox,
  StyledImageHolder,
  StyledInput,
  StyledTextArea,
  StyledBtnContainer,
  StyledButton,
} from "./styles/new.styled";
import styled from "@emotion/styled";
import { TextInput, TextLabel } from "~/components";

export const InputContainer = styled.div`
  display: flex;
`;

export default function NewStoreRoute() {
  return (
    <StyledCreateStore>
      <StyledForm className="flex flex-col">
        <TextLabel htmlFor="storeName">Logo:</TextLabel>
        <StyledInputHolder>
          <StyledLogoBox>
            <StyledImageHolder>
              <img src={addStoreLogo} alt="add store logo" />
              <StyledInput type="file" name="storeLogo" id="storeLogo" hidden />
            </StyledImageHolder>
          </StyledLogoBox>
          <InputContainer>
            <TextInput labelText="Name:" htmlFor="storeName" name="storeName" />
            <TextInput
              labelText="Address:"
              htmlFor="storeAddress"
              name="storeAddress"
            />
          </InputContainer>
        </StyledInputHolder>
        <TextLabel htmlFor="storeComment">Comment:</TextLabel>
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
