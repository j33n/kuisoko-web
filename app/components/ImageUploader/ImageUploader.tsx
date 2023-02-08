import styled from "@emotion/styled";
import type { StyledTheme } from "~/styles/page.styled";
import { useRef, useState } from "react";

import uploadPlaceholder from "~/assets/images/addStoreIcon.svg";
import invariant from "tiny-invariant";

export const StyledImageHolder = styled.div<StyledTheme>`
  display: flex;
  justify-content: center;
  align-items: center;
  align-items: center;
  background-color: ${({ theme: { colors } }) => colors.buttonBgHover};
  border-radius: 0.5rem;
  padding: 0.5rem;
  cursor: pointer;

  img {
    width: 5rem;
    max-height: 5rem;
  }
`;

export const StyledImagePlaceholder = styled.img`
  display: block;

  &:hover {
    opacity: 0.5;
  }
`;

export interface IImageUploader {
  placeholder?: JSX.Element;
  imageUrl?: string;
  handleFileChange: (file: File) => any;
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
    <StyledImageHolder onClick={() => fileInputRef.current?.click()}>
      {!imageUrl &&
        !selectedFile &&
        (placeholder ? (
          placeholder
        ) : (
          <StyledImagePlaceholder
            src={uploadPlaceholder}
            alt="placeholder"
          />
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
  );
};

export default ImageUploader;
