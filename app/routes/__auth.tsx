import { Outlet } from "@remix-run/react";

import {
  StyledLayout,
  StyledContent,
  StyledBodyContent,
  StyledBgImage,
} from "../components/Layout/Layout.styled";
import bgImage from "~/assets/images/loginBg.svg";
import { StyledFooterText, StyledFooter } from "~/styles/page.styled";
import { Header } from "~/components";

export interface IAuth {
  children: React.ReactNode;
  setCurrentTheme: (theme: string) => void;
  currentTheme: string;
}

const Auth = ({ currentTheme, setCurrentTheme }: IAuth) => {
  const currentYear: number = new Date().getFullYear();

  return (
    <StyledLayout>
      <StyledBgImage src={bgImage} />
      <Header />
      <StyledContent sx={{ flexDirection: "column" }}>
        <StyledBodyContent>
          <Outlet />
        </StyledBodyContent>
        <StyledFooter>
          <StyledFooterText>
            &copy; {currentYear} Kuisoko
            {/* TODO: add terms and conditions page/pdf rendering */}
            {/* |{" "} */}
            {/* <Link style={{ fontWeight: 600 }} to="/">
              Term and Conditions
            </Link> */}
          </StyledFooterText>
        </StyledFooter>
      </StyledContent>
    </StyledLayout>
  );
};

export default Auth;
