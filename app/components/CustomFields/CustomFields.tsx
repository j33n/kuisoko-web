import { useTranslation } from "react-i18next";
import { HiOutlineMinus } from "react-icons/hi";
import { Label } from "theme-ui";

import Text from "../Inputs/Text/Text";

import { fields } from "~/data/fieldTypes";

import { StyledInputHolder } from "~/styles/stores/new.styled";
import {
  StyledCustomInput,
  StyledEditableLabel,
  StyledRemoveInput,
} from "../NewItem/NewItem.styled";

import type { CustomFieldProps } from "../NewItem/NewItem";
import { useEffect, useRef, useState } from "react";

export type RenderCustomFieldProps = {
  customFields: CustomFieldProps[];
  onDelete: (val: string) => void;
};

export const RenderCustomFields = ({
  customFields,
  onDelete,
}: RenderCustomFieldProps) => {
  const { t } = useTranslation();

  const usePrevious = (value: CustomFieldProps[]) => {
    const ref = useRef<CustomFieldProps[]>();
    useEffect(() => {
      ref.current = value;
    }, [value]);
    return ref.current;
  };
  const [fieldAdded, setFieldAdded] = useState<boolean>();

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

  return (
    <>
      {customFields.map((field: CustomFieldProps, idx) => (
        <StyledInputHolder key={`${field.type}_${field.id}`}>
          <StyledCustomInput>
            <Label htmlFor={field.name} sx={{ maxWidth: "10rem" }}>
              <StyledEditableLabel
                ref={(el) => (elementRefs.current[idx] = el)}
                id={field.inputName}
                contentEditable
              >
                {field.inputName}
              </StyledEditableLabel>
            </Label>
            {field.name === fields.PLAIN_TEXT.name && (
              <Text
                sx={{ marginRight: "0.5rem" }}
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
            <StyledRemoveInput onClick={() => onDelete(field.inputName)}>
              <HiOutlineMinus size={16} />
            </StyledRemoveInput>
          </StyledCustomInput>
        </StyledInputHolder>
      ))}
    </>
  );
};

export default RenderCustomFields;
