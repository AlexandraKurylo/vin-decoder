import cls from "./Header.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { ThemeToggler } from "../../features/ThemeToggler";

export const Header = () => {
  const navigate = useNavigate();

  const toggleMenu = () => {
    document.documentElement.toggleAttribute("data-menu-open");
  };

  return (
    <header className={cls.header}>
      <div className={cls.headerContainer}>
        <div className={cls.headerLogo} onClick={() => navigate("/")}>
          AutoID
        </div>
        <nav className={cls.headerMenu}>
          <ul className={cls.menuList}>
            <li>
              <NavLink
                to="/"
                end
                className={({ isActive }) => `${cls.menuLink} ${isActive ? cls.active : ""}`}
                onClick={toggleMenu}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/variables"
                className={({ isActive }) => `${cls.menuLink} ${isActive ? cls.active : ""}`}
                onClick={toggleMenu}
              >
                Variables
              </NavLink>
            </li>
          </ul>
        </nav>

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
