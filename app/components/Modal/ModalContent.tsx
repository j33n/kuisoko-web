import type { ReactNode } from "react";

import { StyledModalContent } from "./Modal.styled";

export interface IModalContent {
  children: ReactNode;
}

const ModalContent = ({ children }: IModalContent) => {
  return <StyledModalContent>{children}</StyledModalContent>;
};

export default ModalContent;
