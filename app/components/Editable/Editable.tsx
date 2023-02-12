import styled from "@emotion/styled";
import { useState } from "react";
import { CiEdit, CiSquareCheck, CiSquareRemove } from "react-icons/ci";
import { Box, Text } from "theme-ui";

export interface EditableProps {
  defaultValue?: string;
  fontSize?: "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | null;
  sx?: any;
}

export const StyledEditButton = styled(Box)<any>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2rem;
  height: 2rem;
  border-radius: 0.5rem;
  background-color: ${({ theme: { colors } }) => colors.gray4};
`;

export const StyledEditableContent = styled(Box)<any>`
  display: flex;
  flex-direction: row;
`;

export const StyledText = styled(Text)<any>`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 2rem;
  font-size: ${({ theme: { fontSizes }, fontSize }) => fontSizes[fontSize]};
  color: ${({ theme: { colors } }) => colors.text};
  gap: 0.5rem;
`;

export const EditablePreview = ({ children, ...props }: any) => (
  <StyledText {...props}>{children}</StyledText>
);

export const EditableInput = ({ children, ...props }: any) => (
  <Box {...props}>{children}</Box>
);

export const Editable = ({ defaultValue, fontSize, sx }: EditableProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(defaultValue);
  const [showEditButton, setShowEditButton] = useState(true);

  const handleEdit = () => {
    setIsEditing(true);
  };

  //   const handleCancel = () => {
  //     setIsEditing(false);
  //     setInputValue(value);
  //   };

  //   const handleSave = () => {
  //     setIsEditing(false);
  //   };

  const handleMouseOver = () => {
    setShowEditButton(true);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <StyledEditableContent sx={{ ...sx }}>
      <EditablePreview
        showEditButton={showEditButton}
        onMouseOver={() => setShowEditButton(true)}
        onMouseOut={() => setShowEditButton(false)}
        fontSize={fontSize || "xs"}
      >
        {defaultValue}
        {showEditButton && (
          <StyledEditButton onClick={handleEdit}>
            <CiEdit size={24} />
          </StyledEditButton>
        )}
      </EditablePreview>
      {isEditing && (
        <>
          <EditableInput>{inputValue}</EditableInput>
          <CiSquareCheck size={24} />
          <CiSquareRemove size={24} />
        </>
      )}
    </StyledEditableContent>
  );
};

export default Editable;
