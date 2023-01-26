import type { ReactNode } from "react";

import { StyledModalContainer } from "./Modal.styled";

import ModalHeader from "./ModalHeader";
import ModalContent from "./ModalContent";
import ModalFooter from "./ModalFooter";

export type ModalAnimation =
  | "Unfolding"
  | "Revealing"
  | "Uncovering"
  | "BlowUp"
  | "MeepMeep"
  | "Sketch"
  | "Bond";

export interface IModal {
  children: ReactNode;
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  modalAnimation: ModalAnimation;
  title: string;
}

const Modal = ({
  children,
  open,
  onClose,
  onConfirm,
  modalAnimation,
  title,
}: IModal) => {
  return (
    <StyledModalContainer
      open={open}
      onClose={onClose}
      modalAnimation={modalAnimation}
    >
      <div className="modal-background"></div>
      <div className="modal">
        <ModalHeader onClose={onClose} title={title} />
        <ModalContent>{children}</ModalContent>
        <ModalFooter onClose={onClose} onConfirm={onConfirm} />
      </div>
    </StyledModalContainer>
  );
};

export default Modal;
