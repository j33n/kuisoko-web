// general theme rules
export const base = {
  breakpoints: ['768px'],
  space: ['0px','2px','4px','8px','16px','32px','64px'],
  fonts: {
    heading: 'Inter, system-ui, sans-serif',
    body: 'Inter, system-ui, sans-serif',
  },
  fontSizes: ['12px','14px','16px','20px','24px']
};

// light theme rules
export const light = {
  primary: "#b84d69",
  background: "#fbfef9",
  nav: "#27282b",
  navHover: "#303236",
  border: "#303236",
  text: "#202224",
  boxShadow: "rgba(0, 0, 0, 0.1)",
};

// dark theme rules
export const dark = {
  primary: "#7e1946",
  background: "#080813",
  // background: "#000004",
  nav: "#3498db",
  navHover: "#f0f0f0",
  border: "#deebf1",
  text: "#fefefe",
  boxShadow: "rgba(255, 255, 255, 0.8)",
};

export const zIndices = {
  nav: 100,
  modal: 200,
  overlay: 300,
};