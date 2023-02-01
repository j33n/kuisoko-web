import {
  CiDark,
  CiLight,
  CiBellOn,
} from "react-icons/ci";
import { useColorMode } from "theme-ui";

import Logo from "../../assets/logo.svg";

import {
  StyledHeader,
  StyledLogoBox,
  StyledToolbarSpacer,
  StyledToolbarGroup,
  StyledIconBox,
} from "./Header.styled";
import { StyledToolbarItem } from "~/components/Layout/Layout.styled";
import { useOptionalUser } from "~/utils";

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
