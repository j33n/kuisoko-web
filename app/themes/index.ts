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
      bg: "nav",
      border: "none",
      "&:hover": {
        color: "text",
        bg: "navHover",
      },
      width: "100%",
      minHeight: "48px",
      fontWeight: "bold",
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
};

const commonColors = {
  black: "#080813",
  blue: "#26a4da",
  gray: "#d9d9d9",
  orange: "#e85828",
  red: "#d11c5a",
  white: "#fefefe",
  nav: "#1a71b5",
  navHover: "#26a4da",
};

// light theme rules
export const light: ColorModesScale = {
  primary: "#b84d69",
  background: "#fbfef9",
  buttonBgHover: "rgba(8, 8, 19, 0.1)",
  border: "#303236",
  text: "#202224",
  textDisabled: "#ebebe4",
  boxShadow: "rgba(0, 0, 0, 0.1)",
  // find light mode alternative for this
  labelText: "#4a5568",
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
  boxShadow: "rgba(255, 255, 255, 0.8)",
  labelText: "#4a5568",
  ...commonColors,
};

export const zIndices = {
  nav: 100,
  modal: 200,
  overlay: 300,
};