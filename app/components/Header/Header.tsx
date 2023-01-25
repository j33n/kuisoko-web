import { Link } from "@remix-run/react";
import { CiDark, CiLight, CiCircleQuestion, CiBellOn } from "react-icons/ci";
import { useThemeUI } from "theme-ui";

import Logo from "../../assets/logo.svg";

import {
  StyledHeader,
  StyledLogoBox,
  StyledToolbarSpacer,
  StyledToolbarGroup,
  StyledToolbarItem,
  StyledIconBox,
} from "./Header.styled";

export const ThemeSwitcher = () => {
    const { theme: { rawColors }, colorMode, setColorMode } = useThemeUI();

    console.log("------------", rawColors?.modes)

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
    <StyledIconBox onClick={() => setColorMode && setColorMode(colorMode === "light" ? "dark" : "light")}>
      {colorMode === "light" ? <CiDark /> : <CiLight />}
    </StyledIconBox>
  );
};

const Header = () => {

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
          <ThemeSwitcher />
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
