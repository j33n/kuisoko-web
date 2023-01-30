import styled from "@emotion/styled";
import { CiCircleRemove } from "react-icons/ci";

import { Box } from "theme-ui";
import type { StyledTheme } from "~/styles/page.styled";

export interface IModalHeader {
  title: string;
  onClose: () => void;
  closable?: boolean;
}

export const StyledHeader = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0.5em;
`;

export const StyledTitle = styled.h1<StyledTheme>`
  font-size: 1.5em;
  text-align: center;
  color: ${({ theme }) => theme.colors.nav};
`;

export const StyledCloseButton = styled.span`
  font-size: 1.5em;
  text-align: center;
  margin-right: 1rem;
`;

const ModalFooter = ({ title, onClose, closable }: IModalHeader) => {
  return (
    <StyledHeader>
      <StyledTitle>{title}</StyledTitle>
      {closable && (
        <StyledCloseButton onClick={onClose}>
          <CiCircleRemove size={48} />
        </StyledCloseButton>
      )}
    </StyledHeader>
  );
};

export default ModalFooter;
