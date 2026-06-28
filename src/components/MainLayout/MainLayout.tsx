import { Outlet } from "react-router-dom";
import cls from "./MainLayout.module.css";
import { Header } from "../Header";

export const MainLayout = () => {
  const currentYear: number = new Date().getFullYear();
  return (
    <>
      <div className={cls.mainLayout}>
        <Header />
        <div className={cls.wrapper}>
          <main className={cls.main}>
            <div className={cls.page}>
              <div className={cls.pageContainer}>
                <Outlet />
              </div>
            </div>
          </main>
          <footer className={cls.footer}>
            <div className={cls.footerContainer}>
              Vin Decoder | {currentYear} <br />
              by Oleksandra Kurylo
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};
