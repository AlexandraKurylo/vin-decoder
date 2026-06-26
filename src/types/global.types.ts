import type { Dispatch, SetStateAction } from "react";
import type { THEME_ENUM } from "./global.enums";

export interface IThemeContext {
  theme: THEME_ENUM;
  setTheme: Dispatch<SetStateAction<THEME_ENUM>>;
}

export interface IVinResult {
  Variable: string;
  Value: string;
  VariableId?: string | number; // Знак питання робить поле необов'язковим
}
