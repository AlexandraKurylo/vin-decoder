import { useContext } from "react";
import { ThemeContext } from "../theme/ThemeProvider";
import type { IThemeContext } from "../types/global.types";

export const useTheme = (): IThemeContext => {
  return useContext(ThemeContext);
};
