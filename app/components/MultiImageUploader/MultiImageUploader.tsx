import { useRef, useState, useTransition } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";

import {
  StyledImageHolder,
  StyledImageUpload,
  StyledUploadText,
  StyledUploadView,
} from "./MultiImageUploader.styled";
import { TextLabel } from "../Inputs/Text/Text";
import { useTranslation } from "react-i18next";

export type MultiImageUploadProps = {
  labelText?: string;
  htmlFor?: string | "";
};

export const MultiImageUpload = ({
  labelText,
  htmlFor,
}: MultiImageUploadProps) => {
  const [imageList, setImageList] = useState<FileList | null>(null);

  const { t } = useTranslation();

  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.files && event.currentTarget.files.length > 0) {
      setImageList(event.target.files);
    }
  };

  const fileUploadRef = useRef<HTMLInputElement>(null);

  const ImageListPreview = () => {
    if (imageList && imageList.length > 0) {
      return (
        <>
          {Array.from(imageList).map((file) => (
            <span key={file.name}>{file.name}</span>
          ))}
        </>
      );
    }
    return null;
  };

  return (
    <StyledImageHolder>
      {labelText && <TextLabel htmlFor={htmlFor}>{labelText}</TextLabel>}
      {imageList && imageList.length > 0 && (
        <StyledUploadView>
          <ImageListPreview />
        </StyledUploadView>
      )}
      <StyledImageUpload onClick={() => fileUploadRef.current?.click()}>
        <IoCloudUploadOutline size={32} />
        <StyledUploadText>{t("uploadImages")}</StyledUploadText>
      </StyledImageUpload>
      <input
        type="file"
        ref={fileUploadRef}
        accept=".png, .jpg, .jpeg, .svg"
        onChange={handleFileInput}
        name="itemImages"
        id="itemImages"
        multiple
        hidden
      />
    </StyledImageHolder>
  );
};

export default MultiImageUpload;
