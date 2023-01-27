import { useEffect, useState } from "react";
import type { ReactNode } from "react";

import classNames from "classnames";

import {
  StyledModalContainer,
  StyledModalBackground,
  StyledModal,
} from "./Modal.styled";

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
  title?: string;
  closable?: boolean;
}

const Modal = ({
  children,
  open,
  onClose,
  onConfirm,
  modalAnimation,
  title,
  closable,
}: IModal) => {
  const defaultModalAnimation = modalAnimation;

  const [desktopWidth, setDesktopWidth] = useState<number>(0);
  const [desktopHeight, setDesktopHeight] = useState<number>(0);

  useEffect(() => {
    setDesktopWidth(Math.max(window.screen.width, window.innerWidth));
    setDesktopHeight(Math.max(window.screen.height, window.innerHeight));
  }, []);

  return (
    <StyledModalContainer
      open={open}
      modalAnimation={modalAnimation}
      className={classNames(defaultModalAnimation.toLowerCase())}
    >
      <StyledModalBackground className="modal-background">
        <StyledModal className="modal">
          {title && (
            <ModalHeader onClose={onClose} title={title} closable={closable} />
          )}
          <ModalContent>{children}</ModalContent>
          <ModalFooter onClose={onClose} onConfirm={onConfirm} />
          <svg
            className="modal-svg"
            xmlns="http://www.w3.org/2000/svg"
            width={desktopWidth / 2}
            height={desktopHeight / 2}
            preserveAspectRatio="none"
          >
            <rect
              x="0"
              y="0"
              fill="none"
              width={desktopWidth / 2}
              height={desktopHeight / 2}
              rx="3"
              ry="3"
            ></rect>
          </svg>
        </StyledModal>
      </StyledModalBackground>
    </StyledModalContainer>
  );
};

export default Modal;
