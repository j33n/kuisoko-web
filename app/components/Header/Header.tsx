import { CiDark, CiLight, CiBellOn } from "react-icons/ci";
import { useColorMode } from "theme-ui";
import { useContext, useState } from "react";
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
import styled from "@emotion/styled";

import { useChangeLanguage } from "~/hooks/useChangeLanguage";

export const StyledSelect = styled.select`
  background-color: transparent;
  height: 3rem;
  width: 3rem;
  border-radius: 50%;
  font-size: 14rem;
  margin-left: 1rem;
  border: 1px solid ${({ theme: { colors } }) => colors.buttonBgHover};

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme: { colors } }) => colors.blue4};
  }

  option {
    height: 2rem;
  }
`;

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
  const [langSelected, setLangSelected] = useState<string>("");

  useChangeLanguage(langSelected);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = e.target.value;

    localStorage.setItem("lang", lang);

    setLangSelected(lang);
  };

  return (
    <StyledHeader>
      <StyledLogoBox>
        <img src={Logo} alt="" />
      </StyledLogoBox>
      <StyledToolbarSpacer />
      <StyledToolbarGroup>
        <StyledToolbarItem>
          <ThemeSwitcher />
          <form action="/lang" method="post">
            <StyledSelect name="lang" onChange={handleChange}>
              <option value="rw">RW</option>
              <option value="en">EN</option>
            </StyledSelect>
            <input type="submit" value="submit" hidden />
          </form>
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
