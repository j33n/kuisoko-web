import { useRef, useState } from "react";
import Dialog from "../Dialog/Dialog";
import { useTranslation } from "react-i18next";
import { Button } from "theme-ui";
import * as Tabs from "@radix-ui/react-tabs";
import { StyledInputHolder } from "~/styles/stores/new.styled";
import TextArea from "../Inputs/TextArea/TextArea";
import Text from "../Inputs/Text/Text";
import { CustomFields, MultiImageUploader } from "~/components";

import type { ReactNode } from "react";
import { IoAddOutline } from "react-icons/io5";
import { StyledIconButton } from "../Layout/DropDownMenu/DropDownMenu.styled";

import DropDownMenu from "../Layout/DropDownMenu/DropDownMenu";
import { HiOutlineSelector } from "react-icons/hi";
import fieldTypes from "~/data/fieldTypes";

import { InputContainer } from "../Inputs/Text/Text.styled";
import {
  StyledDropDown,
  StyledDropDownHeader,
  StyledFieldType,
  StyledBtnContainer,
  StyledTabHeader,
  InactiveText,
  StyledTabsContent,
} from "./NewItem.styled";

import type { Field } from "~/data/fieldTypes";
import {
  StyledTabsList,
  StyledTabsTrigger,
} from "../ImageUploader/ImageDialog.styled";

export interface NewItemProps {
  children?: ReactNode;
  store?: any;
}

export type NewItemTriggerProps = {
  onClick: () => void;
};

export interface CustomFieldProps extends Field {
  inputName: string;
}

export const NewItemTrigger = ({ onClick }: NewItemTriggerProps) => {
  return (
    <StyledIconButton onClick={onClick} style={{ marginLeft: "auto" }}>
      <IoAddOutline />
    </StyledIconButton>
  );
};

const NewItem = ({ children, store }: NewItemProps) => {
  const [open, setOpen] = useState(true);
  const { t } = useTranslation();
  const [customFields, setCustomFields] = useState<CustomFieldProps[]>([]);
  const [dropDownState, setDropDownState] = useState(false);
  const btnBtnDeetsRef = useRef<HTMLButtonElement>(null);
  const btnBtnUploadRef = useRef<HTMLButtonElement>(null);

  const customLabel = (type: string) => {
    const similarInputs = customFields.filter((field) => field.type === type);

    if (similarInputs && similarInputs.length > 0) {
      const inputNumIds = similarInputs.map(
        (input) => input.inputName.split("_")[1]
      );

      const id = inputNumIds.sort((a, b) => Number(a) - Number(b)).reverse()[0];
      return `${type}_${Number(id) + 1}`;
    }
    return `${type}_0`;
  };

  const handleAddNewField = (field: Field) => {
    setDropDownState(false);
    setCustomFields([
      ...customFields,
      {
        ...field,
        inputName: customLabel(field.type),
      },
    ]);
  };

  const handleDeleteField = (fieldId: string) => {
    const toDel = customFields.filter(
      (customField) => customField.inputName !== fieldId
    );

    setCustomFields(toDel);
  };

  const handleSubmitItem = () => {
    btnBtnDeetsRef.current?.click();
  };

  return (
    <Dialog
      closeable
      open={open}
      onClose={() => setOpen(false)}
      trigger={<NewItemTrigger onClick={() => setOpen(true)} />}
    >
      <Tabs.Root defaultValue="defaults">
        <StyledTabsList aria-label="Manage your account">
          <StyledTabsTrigger value="defaults">
            {t("defaultFields")}
          </StyledTabsTrigger>
          <StyledTabsTrigger value="uploads">
            {t("uploadImages")}
          </StyledTabsTrigger>
          <StyledTabsTrigger value="customs">
            {t("customFields")}
          </StyledTabsTrigger>
        </StyledTabsList>
        <StyledTabsContent value="defaults">
          <form method="post" action={`/stores/${store.id}/items/new`}>
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
              <InputContainer>
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
              </InputContainer>
            </StyledInputHolder>
            <StyledBtnContainer>
              <Button type="button" onClick={handleSubmitItem}>
                {t("saveItemDetails")}
              </Button>
            </StyledBtnContainer>
          </form>
        </StyledTabsContent>
        <StyledTabsContent value="uploads">
          <form
            method="post"
            action={`/stores/${store.id}/items/uploads`}
            encType="multipart/form-data"
          >
            <MultiImageUploader labelText={`${t("uploadImages")}:`} />
            <StyledBtnContainer>
              <Button type="button" onClick={handleSubmitItem}>
                {t("saveUploads")}
              </Button>
            </StyledBtnContainer>
          </form>
        </StyledTabsContent>
        <StyledTabsContent value="customs">
          <StyledTabHeader>
            <InactiveText style={{ maxWidth: "10rem" }}>Name</InactiveText>
            <InactiveText>Value</InactiveText>
            <StyledDropDown>
              <DropDownMenu
                triggerIcon={<HiOutlineSelector />}
                onOpenChange={setDropDownState}
                open={dropDownState}
                minWidth="100px"
              >
                <StyledDropDownHeader>Add</StyledDropDownHeader>
                {fieldTypes.map((field) => {
                  return (
                    <StyledFieldType
                      key={field.id}
                      onClick={() => handleAddNewField(field)}
                    >
                      {field.name}
                    </StyledFieldType>
                  );
                })}
              </DropDownMenu>
            </StyledDropDown>
          </StyledTabHeader>
          <CustomFields
            customFields={customFields}
            onDelete={(id) => handleDeleteField(id)}
          />
          {customFields && customFields.length > 0 && (
            <StyledBtnContainer>
              <Button type="button" onClick={handleSubmitItem}>
                {t("saveItemDetails")}
              </Button>
            </StyledBtnContainer>
          )}
        </StyledTabsContent>
      </Tabs.Root>
    </Dialog>
  );
};

export default NewItem;
