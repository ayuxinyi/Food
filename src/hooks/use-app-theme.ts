import { AppThemeContext } from "@/contexts/app-theme-context";
import { useContext } from "react";

export function useAppTheme() {
  const context = useContext(AppThemeContext);
  if (!context) {
    throw new Error("useAppTheme must be used within AppThemeProvider");
  }
  return context;
}
