import type { ColorModesScale, Theme } from "theme-ui";

// general theme rules
export const base: Theme = {
  breakpoints: ["40em", "56em", "64em"],
  space: {
    none: "0px",
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "32px",
    xl: "48px",
    xxl: "64px",
  },
  fonts: {
    body: "Inter, sans-serif",
  },
  fontSizes: ["8px", "12px", "16px", "24px", "36px", "48px", "64px", "72px"],
  buttons: {
    primary: {
      color: "color",
      bg: "red",
      border: "1px solid rgba(255, 255, 255, 50%)",
      "&:hover": {
        bg: "rgba(209, 28, 90, 75%)",
        color: "text",
        border: "1px solid rgba(255, 255, 255, 75%)",
      },
      width: "100%",
      minHeight: "48px",
      fontWeight: "400",
      cursor: "pointer",
    },
    secondary: {
      color: "background",
      bg: "secondary",
    },
    accent: {
      color: "background",
      bg: "accent",
    },
    highlight: {
      color: "background",
      bg: "highlight",
    },
    muted: {
      color: "text",
      bg: "muted",
    },
  },
  forms: {
    // mocked
    primary: {
      color: "text",
      bg: "background",
      border: "none",
      "&:hover": {
        color: "text",
        bg: "buttonBgHover",
      },
      width: "100%",
      minHeight: "48px",
      fontWeight: "400",
      cursor: "pointer",
    },
  },
};

const commonColors = {
  black: "#080813",
  blue: "#26a4da",
  gray: "#d9d9d9",
  orange: "#e85828",
  red: "#d11c5a",
  white: "#fefefe",
  nav: "#d11c5a",
  navSecondary: "#b84d69",
  navHover: "rgba(209, 28, 90, 75%)",
};

// light theme rules
export const light: ColorModesScale = {
  primary: "#b84d69",
  background: "#fbfef9",
  buttonBgHover: "rgba(8, 8, 19, 0.1)",
  border: "#303236",
  text: "#202224",
  textDisabled: "#ebebe4",
  boxShadow: "rgba(252, 252, 252, 1) 0px 0px 3px 0px, rgba(255, 255, 255, 40%) 0px 3px 7px -3px",
  boxShadowFocus:
    "rgba(38, 164, 218, 33%) 0px 6px 12px -2px, rgb(209 28 90) 0px 3px 7px -3px",
  ...commonColors,
};

// dark theme rules
export const dark: ColorModesScale = {
  primary: "#7e1946",
  background: "#080813",
  buttonBgHover: "rgba(251, 254, 249, 0.1)",
  border: "#deebf1",
  text: "#fefefe",
  textDisabled: "rgba(255, 255, 255, 42%)",
  boxShadow:
    "rgba(252, 252, 252, 1) 0px 0px 3px 0px, rgba(255, 255, 255, 40%) 0px 3px 7px -3px",
  boxShadowFocus:
    "rgba(38, 164, 218, 33%) 0px 6px 12px -2px, rgba(255, 255, 255, 75%) 0px 3px 7px -3px",
  ...commonColors,
};

export const zIndices = {
  nav: 100,
  modal: 200,
  overlay: 300,
};