import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useState } from "react";
import { CiEdit, CiSquareCheck, CiSquareRemove } from "react-icons/ci";
import { Box, Input, Text } from "theme-ui";
import invariant from "tiny-invariant";

export interface EditableProps {
  defaultValue?: string;
  fontSize?: "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | null;
  sx?: any;
  onSave: (value: string) => void;
}

export const StyledEditButton = styled(Box)<any>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.5rem;
  min-width: 32px;
  height: 2rem;
  background-color: ${({ theme: { colors } }) => colors.gray4};
  color: ${({ theme: { colors } }) => colors.white};
  cursor: pointer;
`;

export const StyledEditableContent = styled(Box)<any>`
  display: flex;
  flex-direction: row;
`;

export const StyledEditable = styled(Box)<any>`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
`;

export const StyledText = ({ theme: { fontSizes, colors }, fontSize }: any) => css`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: ${fontSizes[fontSize]};
  color: ${colors.text};
  gap: 0.5rem;
`;

export const StyledEditablePreview = styled(Text)<any>`
  ${StyledText}
  height: 2rem;
`;

export const StyledEditableInput = styled(Input)<any>`
  ${StyledText}
  border: none;
  border-bottom: 1px dashed ${({ theme: { colors } }) => colors.gray4};
  max-width: 200px;

  &:focus {
    outline: none;
  }
`;

export const Editable = ({
  defaultValue,
  fontSize,
  sx,
  onSave,
}: EditableProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(defaultValue);
  const [showEditButton, setShowEditButton] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
    invariant(inputValue, "Input value cannot be empty");
    onSave(inputValue);
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
            <StyledEditButton onClick={() => setIsEditing(true)}>
              <CiEdit size={24} />
            </StyledEditButton>
          )}
        </StyledEditablePreview>
      )}
      {isEditing && (
        <StyledEditable>
          <StyledEditableInput
            fontSize={fontSize || "xs"}
            value={inputValue}
            onChange={handleInputChange}
          />
          <StyledEditButton onClick={handleSave}>
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
