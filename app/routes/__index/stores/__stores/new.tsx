import addStoreIcon from "~/assets/images/addStoreIcon.svg";
import {
  StyledCreateStore,
  StyledForm,
  StyledInputHolder,
  StyledLogoBox,
  StyledImageHolder,
  StyledTextArea,
  StyledBtnContainer,
  StyledButton,
} from "./styles/new.styled";
import styled from "@emotion/styled";
import { TextInput, TextLabel } from "~/components";
import { useRef, useState } from "react";

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

interface props {
  onChange: (file: File) => any;
  imageUrl?: string;
}

export default function NewStoreRoute() {
  {
    onChange, imageUrl;
  }
  const [draggingOver, setDraggingOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const dropRef = useRef(null);

  // 1
  const preventDefaults = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  // 2
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    preventDefaults(e);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onChange(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
    }
  };

  // 3
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.files && event.currentTarget.files[0]) {
      onChange(event.currentTarget.files[0]);
    }
  };
  return (
    <StyledCreateStore>
      <StyledForm className="flex flex-col">
        <StyledInputHolder>
          <StyledLogoBox>
            <TextLabel htmlFor="storeName">Icon:</TextLabel>
            <StyledImageHolder>
              <img src={addStoreIcon} alt="add store logo" />
              <TextInput
                type="file"
                ref={fileInputRef}
                onChange={handleChange}
                name="storeLogo"
                id="storeLogo"
                hidden
              />
            </StyledImageHolder>
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
