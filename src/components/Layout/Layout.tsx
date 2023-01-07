import React, { useState } from "react";
import { Link } from "react-router-dom";
import { WiMoonAltFirstQuarter, WiMoonAltThirdQuarter } from "react-icons/wi";

import { Box, Grid, Header } from "..";
import Logo from "../../assets/images/logo2.svg";
import {
  Container,
  LogoBox,
  StyledDropDown,
  StyledInput,
  StyledThemeSwitcher,
} from "./Layout.styled";
import { StyledAvatar } from "../../styles/index.styled";

export interface IDropDownMenu {
  children: React.ReactNode;
  show: boolean;
}

export interface ILayout {
  children?: React.ReactNode;
  toggleTheme?: (theme: string) => void;
  currentTheme?: string;
}

const DropDownMenu = ({ children, show, ...restProps }: IDropDownMenu) => {
  return (
    <StyledDropDown {...restProps} show={show}>
      {children}
    </StyledDropDown>
  );
};

const Layout = ({
  children,
  toggleTheme,
  currentTheme,
  ...restProps
}: ILayout) => {
  const [showDropDown, setShowDropDown] = useState(false);

  return (
    <Container {...restProps}>
      <Header title="Build and deploy in the African marketplace with ease">
        <Grid columns={[2, "1fr 2fr"]} sx={{ position: "relative" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <StyledInput placeholder="Search for products, brands and categories" />
          </Box>
          <LogoBox studio={true}>
            <Link to="/">
              <img src={Logo} />
            </Link>
          </LogoBox>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              mr: "1.5rem",
              alignItems: "center",
            }}
          >
            <StyledThemeSwitcher>
              <Link
                to={".."}
                onClick={() => {
                  toggleTheme(currentTheme === "light" ? "dark" : "light");
                  setShowDropDown(false);
                }}
              >
                {currentTheme === "light" ? (
                  <WiMoonAltFirstQuarter size={20} />
                ) : (
                  <WiMoonAltThirdQuarter size={20} />
                )}
              </Link>
            </StyledThemeSwitcher>
            <StyledAvatar
              src="https://avatars.githubusercontent.com/u/11758660?v=4"
              onClick={() => setShowDropDown(!showDropDown)}
            />
          </Box>
        </Grid>
      </Header>
      <DropDownMenu show={showDropDown}>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </DropDownMenu>
      <>{children}</>
    </Container>
  );
};

export default Layout;
