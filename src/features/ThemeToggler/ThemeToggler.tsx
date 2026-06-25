import type { ChangeEvent } from "react";
import { THEME_STORAGE } from "../../constants/global.constants";
import { useTheme } from "../../hooks/useTheme";
import cls from "./ThemeToggler.module.css";
import { THEME_ENUM } from "../../types/global.enums";

export const ThemeToggler = () => {
  const { theme, setTheme } = useTheme();

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    const isChecked = e.target.checked === true;
    const updatedTheme = isChecked ? THEME_ENUM.DARK : THEME_ENUM.LIGHT;

    setTheme(updatedTheme);
    isChecked ? document.body.classList.add("darkLayout") : document.body.classList.remove("darkLayout");
    localStorage.setItem(THEME_STORAGE, updatedTheme);
  };

  return (
    <label className={cls.switch}>
      <input type="checkbox" onChange={onChangeHandler} checked={theme === THEME_ENUM.DARK} />
      <span className={cls.slider}></span>
      <span className={cls.clouds_stars}></span>
    </label>
  );
};
