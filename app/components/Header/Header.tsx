import {
  CiDark,
  CiLight,
  CiCircleQuestion,
  CiBellOn,
  CiLogout,
} from "react-icons/ci";
import { useColorMode } from "theme-ui";

import Logo from "../../assets/logo.svg";

import {
  StyledHeader,
  StyledLogoBox,
  StyledToolbarSpacer,
  StyledToolbarGroup,
  StyledToolbarItem,
  StyledIconBox,
} from "./Header.styled";
import { useOptionalUser } from "~/utils";
import { Link } from "@remix-run/react";

export interface IHeader {
  setCurrentTheme: (theme: string) => void;
  currentTheme?: string;
  authenticated?: boolean;
}

export const ThemeSwitcher = ({ setCurrentTheme }: IHeader) => {
  const colorModes = [`light`, `dark`];

  const [colorMode, setColorMode] = useColorMode();

  return (
    <StyledIconBox
      onClick={() => {
        const index = colorModes.indexOf(colorMode);
        const next = colorModes[(index + 1) % colorModes.length];
        setColorMode(next);
        setCurrentTheme(next);
      }}
      aria-label="Toggle website theme"
    >
      {colorMode === "light" ? <CiDark /> : <CiLight />}
    </StyledIconBox>
  );
};

const Header = ({ setCurrentTheme, currentTheme, authenticated }: IHeader) => {
  const user = useOptionalUser();

  return (
    <StyledHeader>
      <StyledLogoBox>
        <img src={Logo} alt="" />
      </StyledLogoBox>
      <StyledToolbarSpacer />
      <StyledToolbarGroup>
        {/* TODO: build accordion component and attach to FAQ icons */}
        {/* <StyledToolbarItem nav>
          <CiCircleQuestion />
        </StyledToolbarItem> */}

        {authenticated && (
          <Link to="/logout">
            <StyledToolbarItem nav>
              <CiLogout />
            </StyledToolbarItem>
          </Link>
        )}

        <StyledToolbarItem>
          <ThemeSwitcher
            currentTheme={currentTheme}
            setCurrentTheme={setCurrentTheme}
          />
        </StyledToolbarItem>
        {user && (
          <StyledToolbarItem>
            <StyledIconBox>
              <CiBellOn />
            </StyledIconBox>
          </StyledToolbarItem>
        )}
      </StyledToolbarGroup>
    </StyledHeader>
  );
};

export default Header;
