import { useRef, useState } from "react";
import Dialog from "../Dialog/Dialog";
import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";
import { InputContainer } from "~/routes/__index/stores/__stores/new";
import { Button } from "theme-ui";
import { StyledInputHolder } from "~/styles/stores/new.styled";
import TextArea from "../Forms/TextArea";
import TextInput from "../Forms/TextInput";
import { StyledForm, StyledBtnContainer } from "../ImageUploader/ImageUploader";

import type { ReactNode } from "react";
import { IoAddOutline, IoCloudUploadOutline } from "react-icons/io5";
import { StyledIconButton } from "../Layout/DropDownMenu/DropDownMenu.styled";
import {
  StyledImageHolder,
  StyledImageUpload,
  StyledUploadText,
  StyledUploadView,
} from "./NewItem.styled";

export interface NewItemProps {
  children?: ReactNode;
}

export const StyledItemsToolbar = styled.div`
  display: flex;
  width: 100%;
`;

export type NewItemTriggerProps = {
  onClick: () => void;
};

export const NewItemTrigger = ({ onClick }: NewItemTriggerProps) => {
  return (
    <StyledIconButton onClick={onClick} style={{ marginLeft: "auto" }}>
      <IoAddOutline />
    </StyledIconButton>
  );
};

const NewItem = ({ children }: NewItemProps) => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const [imageList, setImageList] = useState<FileList | null>(null);
  const [formData, setFormData] = useState<any>({
    name: "",
    comment: "",
    price: "",
    quantity: "",
  });

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
    <Dialog
      closeable
      title={t("newItem")}
      open={open}
      onClose={() => setOpen(false)}
      trigger={<NewItemTrigger onClick={() => setOpen(true)} />}
    >
      <StyledForm method="post">
        <StyledInputHolder>
          <InputContainer>
            <TextInput
              labelText={`${t("name")}:`}
              htmlFor="itemName"
              name="itemName"
              // error={actionData?.errors?.itemName || ""}
              required
            />
          </InputContainer>
        </StyledInputHolder>
        <StyledInputHolder>
          <InputContainer>
            <TextInput
              labelText={`${t("price")}:`}
              htmlFor="itemPrice"
              name="itemPrice"
              type="number"
              // error={actionData?.errors?.itemPrice || ""}
              min="0"
              required
            />
          </InputContainer>
        </StyledInputHolder>
        <StyledInputHolder>
          <InputContainer>
            <TextInput
              labelText={`${t("quantity")}:`}
              htmlFor="itemQuantity"
              name="itemQuantity"
              type="number"
              // error={actionData?.errors?.itemPrice || ""}
              min="0"
              required
            />
          </InputContainer>
        </StyledInputHolder>
        <StyledInputHolder>
          <TextArea
            labelText={`${t("comment")}:`}
            htmlFor="itemComment"
            name="itemComment"
            id="itemComment"
            rows={5}
            cols={50}
            // error={actionData?.errors?.itemComment}
            required
          />
        </StyledInputHolder>
        <StyledImageHolder>
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
        <StyledBtnContainer>
          <Button
            type="submit"
            // loading={transition.state}
            sx={{ width: "20vw" }}
          >
            {t("createItem")}
          </Button>
        </StyledBtnContainer>
      </StyledForm>
    </Dialog>
  );
};

export default NewItem;
