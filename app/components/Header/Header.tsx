import { Link } from "@remix-run/react";
import { CiDark, CiLight, CiCircleQuestion, CiBellOn } from "react-icons/ci";
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

export interface IThemeSwitcher {
  setCurrentTheme: (theme: string) => void;
  currentTheme?: string;
}

export const ThemeSwitcher = ({ setCurrentTheme }: IThemeSwitcher) => {
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

const Header = ({ setCurrentTheme, currentTheme }: IThemeSwitcher) => {
  const user = useOptionalUser();

  return (
    <StyledHeader>
      <StyledLogoBox>
        <img src={Logo} alt="" />
      </StyledLogoBox>
      <StyledToolbarSpacer />
      <StyledToolbarGroup>
        <StyledToolbarItem nav>
          <CiCircleQuestion />
        </StyledToolbarItem>
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
