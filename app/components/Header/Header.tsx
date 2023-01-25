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

export interface IThemeSwitcher {
  setCurrentTheme: (theme: string) => void;
  currentTheme: string;
};

export const ThemeSwitcher = ({ setCurrentTheme }: IThemeSwitcher) => {
  const colorModes = [`light`, `dark`];

  const [colorMode, setColorMode] = useColorMode();

  // return Object.entries(rawColors).map(([mode, values]) => ({
  //   <Button
  //     sx={{ bg: values.background, color: values.text }}
  //     onClick={() => setColorMode(mode)}
  //   >
  //     {mode}
  //   </Button>
  // }))

  // const handleModeChange = () => {
  //   setColorMode(colorMode === "light" ? "dark" : "light");
  // };

  // return Object.entries(rawColors?.modes).map(([mode, values]) => ({
  //   <Button
  //     sx={{ bg: values.background, color: values.text }}
  //     onClick={() => setColorMode(mode)}
  //   >
  //     {mode}
  //   </Button>
  // }))

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

const Header = ({ setCurrentTheme }: IThemeSwitcher) => {
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
          <ThemeSwitcher setCurrentTheme={setCurrentTheme} />
        </StyledToolbarItem>
        <StyledToolbarItem>
          <StyledIconBox>
            <CiBellOn />
          </StyledIconBox>
        </StyledToolbarItem>
      </StyledToolbarGroup>
    </StyledHeader>
  );
};

export default Header;
