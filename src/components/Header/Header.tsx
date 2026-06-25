import cls from "./Header.module.css";
import { useNavigate } from "react-router-dom";
import { ThemeToggler } from "../../features/ThemeToggler";

export const Header = () => {
  const navigate = useNavigate();

  const toggleMenu = () => {
    document.documentElement.toggleAttribute("data-menu-open");
  };

  return (
    <header className={cls.header}>
      <div className={cls.headerContainer}>
        {/* Лого - зліва */}
        <div className={cls.headerLogo} onClick={() => navigate("/")}>
          AutoID
        </div>

        {/* Меню - по центру */}
        <nav className={cls.headerMenu}>
          <ul className={cls.menuList}>
            <li
              className={cls.menuLink}
              onClick={() => {
                toggleMenu();
                navigate("/");
              }}
            >
              Головна
            </li>
            <li
              className={cls.menuLink}
              onClick={() => {
                toggleMenu();
                navigate("/variables");
              }}
            >
              Змінні
            </li>
          </ul>
        </nav>

        {/* Дії (Тоглер) - справа */}
        <div className={cls.headerActions}>
          <ThemeToggler />
          <div className={cls.iconMenu} onClick={toggleMenu}>
            <span></span>
          </div>
        </div>
      </div>
    </header>
  );
};
