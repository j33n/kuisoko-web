import { Link } from "@remix-run/react";
import AdderButton from "../AdderButton/AdderButton";
import { StyledHeader } from "./PageHeader.styled";
import { singularize } from "~/utils";

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
        <Link to={`/${pageName.toLowerCase()}/new`}>
          <AdderButton
            pageName={singularize(pageName)}
            allowNew={allowNew}
            handleAdder={handleAdder}
            className="adder-button"
          />
        </Link>
      )}
    </StyledHeader>
  );
};

export default PageHeader;
