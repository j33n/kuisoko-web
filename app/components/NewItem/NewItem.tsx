import { useState } from "react";
import Dialog from "../Dialog/Dialog";
import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";
import { Button } from "theme-ui";
import { StyledInputHolder } from "~/styles/stores/new.styled";
import TextArea from "../Inputs/TextArea/TextArea";
import Text from "../Inputs/Text/Text";
import { StyledForm, StyledBtnContainer } from "../ImageUploader/ImageUploader";
import {MultiImageUploader} from "~/components";

import type { ReactNode } from "react";
import { IoAddOutline } from "react-icons/io5";
import { StyledIconButton } from "../Layout/DropDownMenu/DropDownMenu.styled";

import DropDownMenu from "../Layout/DropDownMenu/DropDownMenu";
import { HiOutlineSelector } from "react-icons/hi";
import fieldTypes from "~/data/fieldTypes";
import { InputContainer, StyledSectionText } from "../Inputs/Text/Text.styled";
import {
  StyledDropDown,
  StyledDropDownHeader,
  StyledFieldType,
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
  const [open, setOpen] = useState(true);
  const { t } = useTranslation();

  const [formData, setFormData] = useState<any>({
    name: "",
    comment: "",
    price: "",
    quantity: "",
  });

  return (
    <Dialog
      closeable
      open={open}
      onClose={() => setOpen(false)}
      trigger={<NewItemTrigger onClick={() => setOpen(true)} />}
    >
      <StyledDropDown>
        <DropDownMenu triggerIcon={<HiOutlineSelector />} minWidth="100px">
          <StyledDropDownHeader>Add</StyledDropDownHeader>
          {fieldTypes.map((field) => {
            return (
              <StyledFieldType key={field.id}>{field.name}</StyledFieldType>
            );
          })}
        </DropDownMenu>
      </StyledDropDown>
      <StyledSectionText>Default Fields</StyledSectionText>
      <StyledForm method="post">
        <StyledInputHolder>
          <InputContainer>
            <Text
              labelText={`${t("name")}:`}
              htmlFor="itemName"
              name="itemName"
              horizontal
              // error={actionData?.errors?.itemName || ""}
              required
            />
          </InputContainer>
        </StyledInputHolder>
        <StyledInputHolder>
          <InputContainer>
            <Text
              labelText={`${t("price")}:`}
              htmlFor="itemPrice"
              name="itemPrice"
              type="number"
              horizontal
              // error={actionData?.errors?.itemPrice || ""}
              min="0"
              required
            />
          </InputContainer>
        </StyledInputHolder>
        <StyledInputHolder>
          <InputContainer>
            <Text
              labelText={`${t("quantity")}:`}
              htmlFor="itemQuantity"
              name="itemQuantity"
              type="number"
              horizontal
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
            horizontal
            // error={actionData?.errors?.itemComment}
            required
          />
        </StyledInputHolder>
        <MultiImageUploader labelText={t("uploadImages")} uploadText />
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
