import type { Dispatch, SetStateAction } from "react";
import type { THEME_ENUM } from "./global.enums";

export interface IThemeContext {
  theme: THEME_ENUM;
  setTheme: Dispatch<SetStateAction<THEME_ENUM>>;
}

export interface IVinResult {
  Variable: string;
  Value: string;
  VariableId?: string | number;
}

export interface IVinResponse {
  Results: IVinResult[];
}

export interface IApiError {
  status: number | string;
  message: string;
}

export interface IVariable {
  ID: number;
  Name: string;
  Description: string;
  GroupName: string;
  DataType: string;
}

export interface IVariableResponse {
  Results: IVariable[];
  Message: string;
}
