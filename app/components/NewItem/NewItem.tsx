import { useEffect, useRef, useState } from "react";
import Dialog from "../Dialog/Dialog";
import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";
import { Button, Label } from "theme-ui";
import { StyledInputHolder } from "~/styles/stores/new.styled";
import TextArea from "../Inputs/TextArea/TextArea";
import Text, { TextLabel } from "../Inputs/Text/Text";
import { StyledForm } from "../ImageUploader/ImageUploader";
import { MultiImageUploader } from "~/components";

import type { ReactNode } from "react";
import { IoAddOutline } from "react-icons/io5";
import { StyledIconButton } from "../Layout/DropDownMenu/DropDownMenu.styled";

import DropDownMenu from "../Layout/DropDownMenu/DropDownMenu";
import { HiOutlineMinus, HiOutlineSelector } from "react-icons/hi";
import fieldTypes, { fields } from "~/data/fieldTypes";
import {
  InputContainer,
  StyledInputContainer,
  StyledSectionText,
} from "../Inputs/Text/Text.styled";
import {
  StyledDropDown,
  StyledDropDownHeader,
  StyledFieldType,
  StyledBtnContainer,
} from "./NewItem.styled";

import type { Field } from "~/data/fieldTypes";
import invariant from "tiny-invariant";

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

export const StyledCustomInput = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding-bottom: 1rem;
  position: relative;
  align-items: center;

  div {
    width: 100%;
  }
`;

export const StyledEditableLabel = styled.p`
  border: 1px dashed ${({ theme: { colors } }) => colors.gray4};
  padding: 0.5rem;
  font-size: ${({ theme: { fontSizes } }) => fontSizes.xxxs};
  min-width: 50%;
  border-radius: 0.25rem;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme: { colors } }) => colors.blue4};
  }
`;

export const NewItemTrigger = ({ onClick }: NewItemTriggerProps) => {
  return (
    <StyledIconButton onClick={onClick} style={{ marginLeft: "auto" }}>
      <IoAddOutline />
    </StyledIconButton>
  );
};

export const StyledRemoveInput = styled.div`
  position: absolute;
  right: -1.75rem;
  background: ${({ theme: { colors } }) => colors.blue4};
  width: auto !important;
  border-radius: 50%;
  cursor: pointer;

  svg {
    padding: 0.2rem;
  }

  &:hover {
    background: ${({ theme: { colors } }) => colors.blue6};
  }
`;

export interface CustomFieldProps extends Field {
  inputName: string;
}

export type RenderCustomFieldProps = {
  customFields: CustomFieldProps[];
  onDelete: (val: string) => void;
};

export const RenderCustomFields = ({
  customFields,
  onDelete,
}: RenderCustomFieldProps) => {
  const { t } = useTranslation();

  return (
    <>
      {customFields.map((field: CustomFieldProps, idx) => (
        <StyledInputHolder key={`${field.type}_${field.id}`}>
          <StyledCustomInput>
            <Label htmlFor={field.name} sx={{ maxWidth: "10rem" }}>
              <StyledEditableLabel id={field.inputName} contentEditable>
                {field.inputName}
              </StyledEditableLabel>
            </Label>
            {field.name === fields.PLAIN_TEXT.name && (
              <Text
                htmlFor="itemName"
                name={field.inputName}
                id={field.inputName}
                autoFocus={true}
                // error={actionData?.errors?.itemName || ""}
                required
              />
            )}
            {field.name === fields.NUMBER.name && (
              <Text
                // labelText={`${t(field.type)}:`}
                type="number"
                htmlFor="itemName"
                name={field.inputName}
                horizontal
                // error={actionData?.errors?.itemName || ""}
                required
              />
            )}

            {field.name === fields.LINK.name && (
              <Text
                labelText={`${t(field.type)}:`}
                type="url"
                htmlFor="itemName"
                name={field.inputName}
                horizontal
                // error={actionData?.errors?.itemName || ""}
                required
              />
            )}
            <StyledRemoveInput onClick={() => onDelete(field.inputName)}>
              <HiOutlineMinus />
            </StyledRemoveInput>
          </StyledCustomInput>
        </StyledInputHolder>
      ))}
    </>
  );
};

const NewItem = ({ children }: NewItemProps) => {
  const [open, setOpen] = useState(true);
  const { t } = useTranslation();
  const [customFields, setCustomFields] = useState<CustomFieldProps[]>([]);
  const [dropDownState, setDropDownState] = useState(false);
  const [inputAdded, setInputAdded] = useState<string>(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  const [formData, setFormData] = useState<any>({
    name: "",
    comment: "",
    price: "",
    quantity: "",
  });

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
    
    setInputAdded(customLabel(field.type));
  };

  useEffect(() => {
    if (inputAdded) {
      btnRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "start",
      });
      // document.getElementById(inputAdded)?.focus();
    }
  }, [inputAdded]);

  const handleDeleteField = (fieldId: string) => {
    const toDel = customFields.filter(
      (customField) => customField.inputName !== fieldId
    );

    setCustomFields(toDel);
  };

  return (
    <Dialog
      closeable
      open={open}
      onClose={() => setOpen(false)}
      trigger={<NewItemTrigger onClick={() => setOpen(true)} />}
    >
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
      <StyledForm method="post">
        <StyledSectionText>Default Fields</StyledSectionText>
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
        <MultiImageUploader labelText={t("uploadImages")} uploadText />
        {customFields && customFields.length > 0 && (
          <StyledSectionText>Custom Fields</StyledSectionText>
        )}
        <RenderCustomFields
          customFields={customFields}
          onDelete={(id) => handleDeleteField(id)}
        />
        <StyledBtnContainer>
          <Button type="submit" ref={btnRef}>
            {t("createItem")}
          </Button>
        </StyledBtnContainer>
      </StyledForm>
    </Dialog>
  );
};

export default NewItem;
