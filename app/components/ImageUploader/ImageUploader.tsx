import styled from "@emotion/styled";
import type { StyledTheme } from "~/styles/page.styled";
import { useRef, useState } from "react";

import uploadPlaceholder from "~/assets/images/addStoreIcon.svg";
import invariant from "tiny-invariant";
import { Button } from "~/components";

export const StyledImageHolder = styled.div<StyledTheme>`
  display: flex;
  justify-content: center;
  align-items: center;
  align-items: center;
  border-radius: 0.5rem;
  padding: 5rem;
  cursor: pointer;
  background-color: ${({theme: {colors}}) => colors.whiteA3};
  margin: 0.5rem 0;

  img {
    width: 10vw;
  }
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  align-items: center;
`;

export const StyledImagePlaceholder = styled.img`
  display: block;

  &:hover {
    opacity: 0.5;
  }
`;

export const StyledBtnContainer = styled.div<StyledTheme>`
  display: flex;
  width: 50%;
  justify-content: flex-end;
`;

export interface IImageUploader {
  placeholder?: JSX.Element;
  imageUrl?: string;
  handleFileChange?: any;
  name?: string;
  id?: string;
}

const imageMimeType = /image\/(png|jpg|jpeg|svg)/i;

const ImageUploader = ({
  placeholder,
  imageUrl,
  handleFileChange,
  name,
  id,
}: IImageUploader) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<string>("");

  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.files && event.currentTarget.files[0]) {
      const file = event.currentTarget.files[0];
      invariant(file.type.match(imageMimeType), "Invalid file type");

      setSelectedFile(URL.createObjectURL(file));
      handleFileChange(file);
    }
  };

  return (
    <StyledForm>
      <StyledImageHolder onClick={() => fileInputRef.current?.click()}>
        {!imageUrl &&
          !selectedFile &&
          (placeholder ? (
            placeholder
          ) : (
            <StyledImagePlaceholder src={uploadPlaceholder} alt="placeholder" />
          ))}
        {imageUrl && <img src={imageUrl} alt="store logo" />}
        {selectedFile && <img src={selectedFile} alt="" />}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileInput}
          name={name}
          id={id || name}
          accept=".png, .jpg, .jpeg, .svg"
          hidden
        />
      </StyledImageHolder>
      <StyledBtnContainer>
        <Button>Upload</Button>
      </StyledBtnContainer>
    </StyledForm>
  );
};

export default ImageUploader;
