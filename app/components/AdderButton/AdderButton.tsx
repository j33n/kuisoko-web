import { CiCirclePlus } from "react-icons/ci";
import { StyledAdd, StyledText } from "./AdderButton.styled";

export interface IPageHeader {
  pageName: string;
  allowNew?: boolean;
  handleAdder: (pageName: string) => void;
  className?: string;
}

const AdderButton = ({ pageName, handleAdder, className }: IPageHeader) => {
  const newPageName = pageName && pageName.toLowerCase();

  return (
    <StyledAdd onClick={() => handleAdder(newPageName)} className={className}>
      <CiCirclePlus />
      <StyledText>New {newPageName}</StyledText>
    </StyledAdd>
  );
};

export default AdderButton;
