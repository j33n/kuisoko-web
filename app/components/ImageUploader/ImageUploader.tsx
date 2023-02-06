import styled from "@emotion/styled";
import type { StyledTheme } from "~/styles/page.styled";
import { useRef } from "react";

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
  onChange: (file: File) => any;
}

const ImageUploader = ({ placeholder, imageUrl, onChange }: IImageUploader) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.files && event.currentTarget.files[0]) {
      onChange(event.currentTarget.files[0]);
    }
  };

  return (
    <StyledImageHolder onClick={() => fileInputRef.current?.click()}>
      {!imageUrl && placeholder}
      {imageUrl && <img src={imageUrl} alt="store logo" />}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleChange}
        name="storeLogo"
        id="storeLogo"
        hidden
      />
    </StyledImageHolder>
  );
};

export default ImageUploader;
