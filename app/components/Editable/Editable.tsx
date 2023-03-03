import { useEffect, useState, type ReactNode } from "react";
import { CiEdit, CiSquareCheck, CiSquareRemove } from "react-icons/ci";
import { type InputProps } from "theme-ui";
import invariant from "tiny-invariant";

import {
  StyledEditButton,
  StyledEditable,
  StyledEditableContent,
  StyledEditableInput,
  StyledEditablePreview,
} from "./Editable.styled";

export interface EditableProps extends InputProps {
  fontSize?: "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | null;
  sx?: any;
  onSave: (value: string | number | readonly string[]) => void;
  name: string;
  icon?: ReactNode;
}

export const Editable = ({
  defaultValue,
  fontSize,
  sx,
  onSave,
  name,
  icon: Icon,
  ...otherProps
}: EditableProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(defaultValue);
  const [showEditButton, setShowEditButton] = useState(false);

  useEffect(() => {
    setIsEditing(false);
    setShowEditButton(false);
    setInputValue(defaultValue);
  }, [defaultValue]);

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
      {Icon && Icon}
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
            {...otherProps}
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
