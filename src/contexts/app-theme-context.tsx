import { createContext } from "react";

export type ThemeName = "light" | "dark";

type AppThemeContextType = {
  currentTheme: string;
  isLight: boolean;
  isDark: boolean;
  setTheme: (theme: ThemeName) => void;
  toggleTheme: () => void;
};

export const AppThemeContext = createContext<AppThemeContextType | undefined>(
  undefined,
);
