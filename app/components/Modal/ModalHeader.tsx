import styled from "@emotion/styled";
import { CiCirclePlus } from "react-icons/ci";

import { Box } from "theme-ui";

export interface IModalFooter {
  title: string;
  onClose: () => void;
}

export const StyledTitle = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

export const StyledCloseButton = styled.span`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

const ModalFooter = ({ title, onClose }: IModalFooter) => {
  return (
    <Box>
      <StyledTitle>{title}</StyledTitle>
      <StyledCloseButton onClick={onClose}>
        <CiCirclePlus />
      </StyledCloseButton>
    </Box>
  );
};

export default ModalFooter;
