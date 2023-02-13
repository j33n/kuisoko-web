import {
  CiDark,
  CiLight,
  CiBellOn,
} from "react-icons/ci";
import { useColorMode } from "theme-ui";
import { useContext } from "react";
import { StyledToolbarItem } from "~/components/Layout/Layout.styled";
import { useOptionalUser } from "~/utils";
import type { ThemeProps } from "~/themes/context";
import ThemeContext from "~/themes/context";

import Logo from "~/assets/Logo.svg";

import {
  StyledHeader,
  StyledLogoBox,
  StyledToolbarSpacer,
  StyledToolbarGroup,
  StyledIconBox,
} from "./Header.styled";


export interface IHeader {
  setCurrentTheme: (theme: string) => void;
  currentTheme?: string;
  authenticated?: boolean;
}

export const ThemeSwitcher = () => {
  const colorModes = [`light`, `dark`];
  const [colorMode, setColorMode] = useColorMode();

  const theme: ThemeProps = useContext(ThemeContext);

  return (
    <StyledIconBox
      onClick={(e) => {
        const index = colorModes.indexOf(colorMode);
        const next = colorModes[(index + 1) % colorModes.length];
        setColorMode(next);
        theme.setTheme(next);
      }}
      aria-label="Toggle website theme"
    >
      {colorMode === "light" ? <CiDark /> : <CiLight />}
    </StyledIconBox>
  );
};

const Header = () => {
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

        <StyledToolbarItem>
          <ThemeSwitcher />
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
