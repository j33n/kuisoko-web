import styled from "@emotion/styled";
import type { StyledTheme } from "~/styles/page.styled";
import { useRef, useState } from "react";

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
    max-width: 5rem;
  }
`;

export interface IImageUploader {
  placeholder?: JSX.Element;
  imageUrl?: string;
  handleFileChange: (file: File) => any;
  name?: string;
  id?: string;
}

const ImageUploader = ({
  placeholder,
  imageUrl,
  handleFileChange,
  name,
  id,
}: IImageUploader) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  // const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.files && event.currentTarget.files[0]) {
      setSelectedFile(event.currentTarget.files[0]);
      handleFileChange(event.currentTarget.files[0]);
    }
  };

  return (
    <StyledImageHolder onClick={() => fileInputRef.current?.click()}>
      {!imageUrl && placeholder}
      {imageUrl && <img src={imageUrl} alt="store logo" />}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInput}
        name={name}
        id={id || name}
        hidden
      />
    </StyledImageHolder>
  );
};

export default ImageUploader;
