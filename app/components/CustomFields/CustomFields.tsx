import React, { useEffect, useRef, useState } from "react";
import { useFetcher, useMatches, useParams } from "@remix-run/react";
import { useTranslation } from "react-i18next";
import invariant from "tiny-invariant";
import { HiOutlineMinus, HiOutlineSelector } from "react-icons/hi";
import { Button, Label } from "theme-ui";

import fieldTypes, { fields } from "~/data/fieldTypes";

import Text from "../Inputs/Text/Text";
import DropDownMenu from "../Layout/DropDownMenu/DropDownMenu";
import { ToggleInput } from "~/components";

import { StyledInputHolder } from "~/styles/stores/new.styled";
import {
  InactiveText,
  StyledBtnContainer,
  StyledCustomInput,
  StyledDropDown,
  StyledDropDownHeader,
  StyledEditableLabel,
  StyledFieldType,
  StyledRemoveInput,
  StyledTabHeader,
} from "../NewItem/NewItem.styled";

import type { CustomFieldProps } from "../NewItem/NewItem";
import type { CustomField, ItemCustomField } from "@prisma/client";

export type RenderCustomFieldProps = {
  customFields: CustomFieldProps[];
  onDelete: (val: string) => void;
};

export interface ExtendedItemCustomField extends ItemCustomField {
  field: CustomField;
}

export const RenderCustomFields = () => {
  const { t } = useTranslation();
  const { storeId, itemId } = useParams();
  const fetcher = useFetcher();
  const matches = useMatches();

  const [fieldAdded, setFieldAdded] = useState<boolean>();
  const [dropDownState, setDropDownState] = useState<boolean>(false);
  const [customFields, setCustomFields] = useState<CustomFieldProps[]>([]);
  const [labelNames, setLabelNames] = useState<any>({});

  invariant(storeId, "missing store id!");
  invariant(itemId, "missing item id!");

  const pathname = `/stores/${storeId}/items/${itemId}`;
  let parentMatch = matches.find((match) => match.pathname === pathname);

  const dbCustomFields = parentMatch?.data?.item?.itemCustomFields;

  useEffect(() => {
    dbCustomFields.map((customField: ExtendedItemCustomField) => {
      setCustomFields([
        {
          ...customField.field,
          inputName: customField.customName,
        },
      ]);
    });
  }, []);

  const usePrevious = (value: CustomFieldProps[]) => {
    const ref = useRef<CustomFieldProps[]>();
    useEffect(() => {
      ref.current = value;
    }, [value]);
    return ref.current;
  };

  const elementRefs = useRef<any>([]);
  useEffect(() => {
    elementRefs.current = elementRefs.current?.slice(0, customFields.length);
  }, [customFields]);

  const prevFields = usePrevious(customFields);

  useEffect(() => {
    const lastField = customFields[customFields.length - 1];
    setTimeout(() => {
      if (customFields.length > 0) {
        document.getElementById(lastField.inputName)?.focus();
        document.getElementById(lastField.inputName)?.scrollIntoView({
          behavior: "smooth",
        });
      }
    }, 100);
  }, [customFields, fieldAdded]);

  useEffect(() => {
    if (prevFields && customFields && customFields.length > prevFields.length) {
      setFieldAdded(customFields.length > prevFields.length);
    }
  }, [customFields, prevFields]);

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

  const handleLabelChange = (e: any, id: string) => {
    setLabelNames({
      ...labelNames,
      [id]: e.target?.innerText,
    });
  };

  const handleDeleteField = (fieldId: string) => {
    const toDel = customFields.filter(
      (customField) => customField.inputName !== fieldId
    );

    setCustomFields(toDel);
  };

  const handleAddNewField = (field: CustomField) => {
    setDropDownState(false);
    setCustomFields([
      ...customFields,
      {
        ...field,
        inputName: customLabel(field.type),
      },
    ]);
  };

  const handleSaveNewFieldName = (fieldName: string, field: CustomField) => {
    fetcher.submit(
      {
        fieldType: field.type,
        fieldValue: fieldName,
        _action: "saveFieldName",
      },
      { method: "post", action: `/stores/${storeId}/items/${itemId}/customs` }
    );
  };

  return (
    <>
      <StyledTabHeader>
        <InactiveText style={{ maxWidth: "10rem" }}>Name</InactiveText>
        <InactiveText>Value</InactiveText>
        <StyledDropDown>
          <DropDownMenu
            triggerIcon={<HiOutlineSelector />}
            onOpenChange={setDropDownState}
            open={dropDownState}
            width="100px"
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
      {customFields.map((field: CustomFieldProps, idx) => (
        <StyledInputHolder key={`${field.type}_${field.id}`}>
          <StyledCustomInput>
            <fetcher.Form>
              <Label htmlFor={field.name} sx={{ width: "10rem" }}>
                <StyledEditableLabel
                  ref={(el) => (elementRefs.current[idx] = el)}
                  id={field.inputName}
                  onInput={(e) => handleLabelChange(e, field.inputName)}
                  onBlur={(e) =>
                    handleSaveNewFieldName(
                      labelNames[field.inputName] || field.inputName,
                      field
                    )
                  }
                  contentEditable
                >
                  {field.inputName}
                </StyledEditableLabel>
              </Label>
            </fetcher.Form>
            <input
              type="text"
              name={labelNames[field.inputName] || field.inputName}
              value={idx}
              hidden
            />
            <input
              type="text"
              name={labelNames[field.inputName] || field.inputName}
              value={field.type}
              hidden
            />
            <input
              type="text"
              name={labelNames[field.inputName] || field.inputName}
              value={labelNames[field.inputName] || field.inputName}
              hidden
            />
            {field.name === fields.PLAIN_TEXT.name && (
              <Text
                sx={{ marginRight: "0.5rem" }}
                htmlFor="itemName"
                name={labelNames[field.inputName] || field.inputName}
                id={field.inputName}
                autoFocus={true}
                // error={actionData?.errors?.itemName || ""}
                required
              />
            )}
            {field.name === fields.NUMBER.name && (
              <Text
                sx={{ marginRight: "0.5rem" }}
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
                sx={{ marginRight: "0.5rem" }}
                type="url"
                htmlFor="itemName"
                name={field.inputName}
                horizontal
                // error={actionData?.errors?.itemName || ""}
                required
              />
            )}
            {field.name === fields.TOGGLE.name && <ToggleInput />}
            <StyledRemoveInput
              onClick={() => handleDeleteField(field.inputName)}
            >
              <HiOutlineMinus size={16} />
            </StyledRemoveInput>
          </StyledCustomInput>
        </StyledInputHolder>
      ))}
      {/* {customFields && customFields.length > 0 && (
        <StyledBtnContainer>
          <Button type="submit">{t("saveCustomItemDetails")}</Button>
        </StyledBtnContainer>
      )} */}
    </>
  );
};

export default RenderCustomFields;

// TODO: add support for item ordering
