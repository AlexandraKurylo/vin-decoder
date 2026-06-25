import type { Dispatch, SetStateAction } from "react";
import type { THEME_ENUM } from "./global.enums";

export interface IAuthContext {
  isAuth: boolean;
  setIsAuth: Dispatch<SetStateAction<boolean>>;
}

export interface IThemeContext {
  theme: THEME_ENUM;
  setTheme: Dispatch<SetStateAction<THEME_ENUM>>;
}

export interface IQuestionCard {
  id: string;
  question: string;
  answer: string;
  description: string;
  resources: string[];
  level: number;
  completed: boolean;
  editDate?: string;
}

export interface IQuestionCardState extends IQuestionCard {
  clearForm: boolean;
}

export interface IQuestionCardData {
  data: IQuestionCard[];
  first: number | null;
  prev: number | null;
  next: number | null;
  last: number | null;
  pages: number | null;
  items: number | null;
}
