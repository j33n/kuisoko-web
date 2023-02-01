import { createContext } from "react";

export interface ThemeProps {
  theme: string | null;
  setTheme: (theme: string) => void
}

const ThemeContext = createContext<ThemeProps>({
  theme: null,
  setTheme: () => {},
});

export default ThemeContext;