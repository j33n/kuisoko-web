import React, { createContext, useState } from "react";
// import { ApolloProvider } from "@apollo/client";
// import apolloClient from "../lib/apollo";
import { ThemeProvider } from "styled-components";
import { createGlobalStyle } from "styled-components";

import { theme } from "./themes";

import { RouterProvider } from "react-router-dom";

import Routes from "./Routes";

export const ThemePreferenceContext = createContext(null);

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');
  
  body {
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;
  }
`;

export const App = () => {
  const [currentTheme, setCurrentTheme] = useState("dark");

  return (
    <ThemeProvider theme={{ ...theme, colors: theme.colors.modes[currentTheme] }}>
      <GlobalStyles />
      <RouterProvider router={Routes} />
    </ThemeProvider>
  );
};

export default App;
