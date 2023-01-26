import type { ReactNode } from "react";

import { StyledButton, StyledModalFooter } from "./Modal.styled";

export interface IModalFooter {
  children?: ReactNode;
  onClose: () => void;
  onConfirm: () => void;
}

const ModalFooter = ({ children, onClose, onConfirm }: IModalFooter) => {
  return (
    <StyledModalFooter>
      <StyledButton onClick={onConfirm}>Cancel</StyledButton>
      <StyledButton onClick={onClose}>Cancel</StyledButton>
      <>{children}</>
    </StyledModalFooter>
  );
};

export default ModalFooter;
