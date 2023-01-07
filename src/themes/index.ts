import type { Theme } from "theme-ui";

export const zIndices = {
  nav: 100,
  modal: 200,
  overlay: 300,
};

export const theme: Theme = {
  zIndices,
  breakpoints: ["768px"],
  space: ["0px", "2px", "4px", "8px", "16px", "32px", "64px"],
  fonts: {
    heading: "Inter, system-ui, sans-serif",
    body: "Inter, system-ui, sans-serif",
  },
  fontSizes: ["12px", "14px", "16px", "20px", "24px"],
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125,
  },
  colors: {
    modes: {
      dark: {
        primary: "#7e1946",
        secondary: "#b84d69",
        background: "#080813",
        nav: "#3498db",
        navHover: "#f0f0f0",
        border: "#deebf1",
        text: "#fefefe",
        boxShadow: "rgba(255, 255, 255, 0.8)",
        muted: "#1a1a1a",
        accent: "#f0f0f0",
        highlight: "#f0f0f0",
      },
      light: {
        primary: "#b84d69",
        secondary: "#7e1946",
        background: "#fbfef9",
        nav: "#27282b",
        navHover: "#303236",
        border: "#303236",
        text: "#202224",
        boxShadow: "rgba(0, 0, 0, 0.1)",
        muted: "#f6f6f6",
      },
    },
  },
};

export default theme;
