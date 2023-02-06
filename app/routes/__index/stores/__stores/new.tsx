import addStoreIcon from "~/assets/images/addStoreIcon.svg";
import {
  StyledCreateStore,
  StyledForm,
  StyledInputHolder,
  StyledLogoBox,
  StyledTextArea,
  StyledBtnContainer,
  StyledButton,
} from "./styles/new.styled";
import styled from "@emotion/styled";

import { useState } from "react";

import { TextInput, TextLabel, ImageUploader } from "~/components";

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const imagePlaceholder = (<img src={addStoreIcon} alt="add store icon" />);


export default function NewStoreRoute() {
  const imageUrl = "";
  const [formData, setFormData] = useState({});

  const handleFileUpload = async (file: File) => {
    let inputFormData = new FormData();
    inputFormData.append("icon", file);

    // TODO: fix this
    const response = await fetch("/avatar", {
      method: "POST",
      body: inputFormData,
    });
    const { imageUrl } = await response.json();
    setFormData({
      ...formData,
      profilePicture: imageUrl,
    });
  };

  return (
    <StyledCreateStore>
      <StyledForm className="flex flex-col">
        <StyledInputHolder>
          <StyledLogoBox>
            <TextLabel htmlFor="storeIcon">Icon:</TextLabel>
            <ImageUploader
              placeholder={imagePlaceholder}
              // imageUrl={formData.icon || ""}
              imageUrl={""}
              onChange={handleFileUpload}
            />
          </StyledLogoBox>
          <InputContainer>
            <TextInput labelText="Name:" htmlFor="storeName" name="storeName" />
            <TextInput
              labelText="Location:"
              htmlFor="storeLocation"
              name="storeLocation"
            />
          </InputContainer>
        </StyledInputHolder>
        <StyledInputHolder>
          <TextLabel htmlFor="storeComment">Comment:</TextLabel>
          <StyledTextArea
            name="storeComment"
            id="storeComment"
            rows={5}
            cols={50}
          />
        </StyledInputHolder>
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
