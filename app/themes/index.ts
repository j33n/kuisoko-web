import type { ColorModesScale, Theme } from "theme-ui";
import {
  gray,
  blue,
  red,
  green,
  crimson,
  grayDark,
  blueDark,
  redDark,
  greenDark,
  crimsonDark,
  blackA,
  whiteA,
} from "@radix-ui/colors";

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
  fontSizes: {
    xxs: "0.875rem",
    xs: "1rem",
    sm: "1.25rem",
    md: "1.5rem",
    lg: "1.75rem",
    xl: "2rem",
    xxl: "3rem",
  },
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
  error: "rgb(185, 28, 28)",
  overlay: "rgba(0, 0, 0, 0.5)",
  ...whiteA,
  ...blackA,
};

// light theme rules
export const light: ColorModesScale = {
  primary: "#b84d69",
  background: "#fbfef9",
  buttonBgHover: "rgba(8, 8, 19, 0.1)",
  border: "#303236",
  text: "#202224",
  textDisabled: "#ebebe4",
  fontWeight: "400",
  boxShadow:
    "rgba(201, 191, 191, 1) 0px 0px 3px 0px, rgba(0, 0, 0, 56%) 0px 3px 7px -3px",
  boxShadowFocus:
    "rgba(38, 164, 218, 33%) 0px 6px 12px -2px, rgb(209 28 90) 0px 3px 7px -3px",
  ...gray,
  ...blue,
  ...red,
  ...green,
  ...crimson,
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
  fontWeight: "200",
  boxShadow:
    "rgba(252, 252, 252, 1) 0px 0px 3px 0px, rgba(255, 255, 255, 40%) 0px 3px 7px -3px",
  boxShadowFocus:
    "rgba(255, 255, 255, 40%) 0px 6px 12px -2px, rgba(209, 28, 90, 50%) 0px 3px 7px -3px",
  ...grayDark,
  ...blueDark,
  ...redDark,
  ...greenDark,
  ...crimsonDark,
  ...commonColors,
};

export const zIndices = {
  nav: 100,
  modal: 200,
  overlay: 300,
};