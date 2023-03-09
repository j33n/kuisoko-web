import { useEffect, useRef, useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";

import {
  StyledImageHolder,
  StyledImageUpload,
  StyledUploadText,
  StyledUploadView,
  StyledImagePreview,
} from "./MultiImageUploader.styled";
import { TextLabel } from "../Inputs/Text/Text";
import { useTranslation } from "react-i18next";
import { StyledFloatIconButton } from "../Layout/DropDownMenu/DropDownMenu.styled";
import { HiOutlineMinus } from "react-icons/hi";
import { StyledError } from "~/styles/page.styled";

export type MultiImageUploadProps = {
  labelText?: string | null;
  htmlFor?: string | "";
  multiple?: boolean;
  uploadText?: boolean;
};

export const MultiImageUpload = ({
  labelText,
  htmlFor,
  multiple = true,
  uploadText = false,
}: MultiImageUploadProps) => {
  const [imageList, setImageList] = useState<File[]>([]);
  const fileUploadRef = useRef<HTMLInputElement>(null);
  const [imageHovered, setImageHovered] = useState<number | null>(null);
  const [fileLimit, setFileLimit] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const MAX_COUNT = 5;

  const { t } = useTranslation();

  useEffect(() => {
    setFileLimit(imageList.length >= MAX_COUNT);
  }, [imageList]);

  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUploadError("");
    if (event.currentTarget.files && event.currentTarget.files.length > 0) {
      const files = Array.prototype.slice.call(event.target.files);
      const uploaded = [...imageList];
      let limitExceeded = false;

      files.some((file) => {
        if (uploaded.findIndex((f) => f.name === file.name) === -1) {
          uploaded.push(file);

          if (uploaded.length > MAX_COUNT) {
            limitExceeded = true;
            setUploadError(`Only ${MAX_COUNT} images allowed`);
          }
        } else {
          setUploadError(`Image ${file.name} already uploaded`);
        }
      });

      if (!limitExceeded) setImageList(uploaded);
    }
  };

  const handleRemoveImage = (
    idx: number,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    if (!imageList || imageList.length === 0) return null;
    const newImageList = imageList.filter((image, index) => idx !== index);
    setImageList(newImageList);
  };

  const fileUrl = (file: File) => URL.createObjectURL(file);

  return (
    <StyledImageHolder>
      {labelText && <TextLabel htmlFor={htmlFor}>{labelText}</TextLabel>}
      <StyledUploadView>
        <StyledImageUpload
          onClick={() => fileUploadRef.current?.click()}
          disabled={fileLimit}
        >
          <IoCloudUploadOutline size={32} />
          {uploadText && (
            <StyledUploadText>{t("uploadImages")}</StyledUploadText>
          )}
        </StyledImageUpload>
        {imageList &&
          imageList.length > 0 &&
          imageList.map((file, idx) => (
            <StyledImagePreview
              key={idx}
              onMouseOver={() => setImageHovered(idx)}
              onMouseOut={() => setImageHovered(null)}
            >
              <StyledFloatIconButton
                onClick={(e) => handleRemoveImage(idx, e)}
                style={{
                  visibility: imageHovered === idx ? "visible" : "hidden",
                }}
              >
                <HiOutlineMinus size={16} />
              </StyledFloatIconButton>
              <img src={fileUrl(file)} alt="" key={idx} />
            </StyledImagePreview>
          ))}
        {!!uploadError && <StyledError>{uploadError}</StyledError>}
      </StyledUploadView>
      <input
        type="file"
        ref={fileUploadRef}
        accept=".png, .jpg, .jpeg, .svg"
        onChange={handleFileInput}
        name="itemImages"
        id="itemImages"
        multiple={multiple}
        hidden
      />
    </StyledImageHolder>
  );
};

export default MultiImageUpload;
