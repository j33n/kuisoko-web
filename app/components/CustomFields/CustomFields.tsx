import React, { useEffect, useRef, useState } from "react";
import { useFetcher, useMatches, useParams } from "@remix-run/react";
import invariant from "tiny-invariant";
import { HiOutlineMinus, HiOutlineSelector } from "react-icons/hi";
import { Label } from "theme-ui";

import fieldTypes, { fields } from "~/data/fieldTypes";

import Text from "../Inputs/Text/Text";
import DropDownMenu from "../Layout/DropDownMenu/DropDownMenu";
import { ToggleInput } from "~/components";

import { StyledInputHolder } from "~/styles/stores/new.styled";
import {
  InactiveText,
  StyledCustomInput,
  StyledDropDown,
  StyledDropDownHeader,
  StyledEditableLabel,
  StyledFieldType,
  StyledRemoveInput,
  StyledTabHeader,
} from "../NewItem/NewItem.styled";

import type { CustomField, ItemCustomField } from "@prisma/client";
import type { CustomFieldProps } from "~/data/fieldTypes";

export interface CustomFieldExtProps extends CustomFieldProps {
  id: string;
  customName: string;
  value: string | null;
  order: string | null;
}

export type RenderCustomFieldProps = {
  customFields: CustomFieldProps[];
  onDelete: (val: string) => void;
};

export interface ExtendedItemCustomField extends ItemCustomField {
  field: CustomField;
}

export type ExcludeIdCustomField = Omit<ExtendedItemCustomField, "id">;

export const RenderCustomFields = () => {
  const { storeId, itemId } = useParams();
  const fetcher = useFetcher();
  const matches = useMatches();

  const [fieldAdded, setFieldAdded] = useState<boolean>();
  const [dropDownState, setDropDownState] = useState<boolean>(false);
  const [customFields, setCustomFields] = useState<CustomFieldExtProps[]>([]);

  invariant(storeId, "missing store id!");
  invariant(itemId, "missing item id!");

  const pathname = `/stores/${storeId}/items/${itemId}`;
  let parentMatch = matches.find((match) => match.pathname === pathname);

  const dbCustomFields = parentMatch?.data?.item?.itemCustomFields;

  useEffect(() => {
    const dbFields = dbCustomFields.map(
      (customField: ExtendedItemCustomField) => {
        return {
          ...customField.field,
          id: customField.id,
          value: customField.value,
          customName: customField.customName,
        };
      }
    );
    setCustomFields(dbFields);
  }, [dbCustomFields]);

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
        document.getElementById(lastField.customName)?.focus();
        document.getElementById(lastField.customName)?.scrollIntoView({
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
    const similarInputs = customFields.filter((field) => field.type === type && field.customName.includes(type));

    if (similarInputs && similarInputs.length > 0) {
      const inputNumIds = similarInputs.map(
        (input) => input.customName.split("_")[1]
      );

      const id = inputNumIds.sort((a, b) => Number(a) - Number(b)).reverse()[0];
      if (isNaN(Number(id))) {
        return `${type}_0`;
      }
      return `${type}_${Number(id) + 1}`;
    }
    return `${type}_0`;
  };

  const handleAddNewField = (field: CustomFieldProps) => {
    setDropDownState(false);
    
    fetcher.submit(
      {
        fieldType: field.type,
        fieldValue: customLabel(field.type),
        _action: "saveFieldName",
      },
      { method: "post", action: `/stores/${storeId}/items/${itemId}/customs` }
    );
  };

  const handleUpdateNewField = (
    e: React.FocusEvent<HTMLParagraphElement, Element>,
    customField: CustomFieldProps
  ) => {
    fetcher.submit(
      {
        fieldId: customField.id,
        fieldValue: e.target?.innerText,
        _action: "updateFieldName",
      },
      { method: "put", action: `/stores/${storeId}/items/${itemId}/customs` }
    );
  };

  const handleDeleteField = (fieldId: string) => {
    const toDel = customFields.filter(
      (customField) => customField.customName !== fieldId
    );
    setCustomFields(toDel);
    fetcher.submit(
      {
        fieldId,
        _action: "deleteFieldName",
      },
      { method: "delete", action: `/stores/${storeId}/items/${itemId}/customs` }
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
      {customFields.map((customField: CustomFieldExtProps, idx) => (
        <StyledInputHolder key={`${customField.type}_${customField.id}`}>
          <StyledCustomInput>
            <fetcher.Form>
              <Label htmlFor={customField.name} sx={{ width: "10rem" }}>
                <StyledEditableLabel
                  ref={(el) => (elementRefs.current[idx] = el)}
                  id={customField.id}
                  onBlur={(e) => handleUpdateNewField(e, customField)}
                  contentEditable
                >
                  {customField.customName}
                </StyledEditableLabel>
              </Label>
            </fetcher.Form>
            <fetcher.Form style={{ width: "100%", marginRight: "0.5rem" }}>
              {customField.name === fields.PLAIN_TEXT.name && (
                <Text
                  htmlFor="itemName"
                  name={customField.customName}
                  id={customField.id}
                  autoFocus={true}
                  // error={actionData?.errors?.itemName || ""}
                  required
                />
              )}
              {customField.name === fields.NUMBER.name && (
                <Text
                  type="number"
                  htmlFor="itemName"
                  name={customField.customName}
                  horizontal
                  // error={actionData?.errors?.itemName || ""}
                  required
                />
              )}
              {customField.name === fields.LINK.name && (
                <Text
                  type="url"
                  htmlFor="itemName"
                  name={customField.customName}
                  horizontal
                  // error={actionData?.errors?.itemName || ""}
                  required
                />
              )}
              {customField.name === fields.TOGGLE.name && <ToggleInput />}
            </fetcher.Form>
            <StyledRemoveInput
              onClick={() => handleDeleteField(customField.id)}
            >
              <HiOutlineMinus size={16} />
            </StyledRemoveInput>
          </StyledCustomInput>
        </StyledInputHolder>
      ))}
    </>
  );
};

export default RenderCustomFields;

// TODO: add support for item ordering
