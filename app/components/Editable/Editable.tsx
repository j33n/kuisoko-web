import { useEffect, useState } from "react";
import { CiEdit, CiSquareCheck, CiSquareRemove } from "react-icons/ci";
import invariant from "tiny-invariant";

import {
  StyledEditButton,
  StyledEditable,
  StyledEditableContent,
  StyledEditableInput,
  StyledEditablePreview,
} from "./Editable.styled";

export interface EditableProps {
  defaultValue?: string | null;
  fontSize?: "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | null;
  sx?: any;
  onSave: (value: string) => void;
  name: string;
}

export const Editable = ({
  defaultValue,
  fontSize,
  sx,
  onSave,
  name,
}: EditableProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(defaultValue);
  const [showEditButton, setShowEditButton] = useState(false);

  useEffect(() => {
    setIsEditing(false);
    setShowEditButton(false);
    setInputValue(defaultValue);
  }, [defaultValue])

  const handleSave = () => {
    setIsEditing(false);
    invariant(inputValue, `${inputValue} value cannot be empty`);
    if (inputValue === defaultValue) return;
    onSave(inputValue);
    setInputValue(inputValue);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <StyledEditableContent sx={{ ...sx }}>
      {!isEditing && (
        <StyledEditablePreview
          showEditButton={showEditButton}
          onMouseOver={() => setShowEditButton(true)}
          onMouseOut={() => setShowEditButton(false)}
          fontSize={fontSize || "xs"}
          onDoubleClick={() => setIsEditing(true)}
        >
          {defaultValue}
          {showEditButton && (
            <StyledEditButton
              onClick={(e) => {
                e.preventDefault();
                setIsEditing(true);
              }}
            >
              <CiEdit size={24} />
            </StyledEditButton>
          )}
        </StyledEditablePreview>
      )}
      {isEditing && (
        <StyledEditable>
          <StyledEditableInput
            fontSize={fontSize || "xs"}
            name={name}
            value={inputValue}
            onChange={handleInputChange}
          />
          <StyledEditButton type="submit" onClick={() => handleSave()}>
            <CiSquareCheck size={24} />
          </StyledEditButton>
          <StyledEditButton onClick={() => setIsEditing(false)}>
            <CiSquareRemove size={24} />
          </StyledEditButton>
        </StyledEditable>
      )}
    </StyledEditableContent>
  );
};

export default Editable;
