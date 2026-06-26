import cls from "./Button.module.css";

export const Button = ({ children, onClick, disabled, type = "button" }: any) => (
  <button className={cls.button} onClick={onClick} disabled={disabled} type={type}>
    {children}
  </button>
);
