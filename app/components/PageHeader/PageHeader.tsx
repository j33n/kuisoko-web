import AdderButton from "../AdderButton/AdderButton";
import { StyledHeader } from "./PageHeader.styled";

export interface IPageHeader {
  pageName: string;
  allowNew?: boolean;
  handleAdder: (pageName: string) => void;
}

const PageHeader = ({ pageName, allowNew, handleAdder }: IPageHeader) => {
  const newPageName = pageName && pageName.toLowerCase();

  return (
    <StyledHeader>
      {allowNew && String(newPageName) === pageName && (
        <AdderButton
          pageName={pageName}
          allowNew={allowNew}
          handleAdder={handleAdder}
        />
      )}
    </StyledHeader>
  );
};

export default PageHeader;
