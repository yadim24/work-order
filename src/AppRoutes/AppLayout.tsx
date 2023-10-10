import { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import styles from './AppLayout.module.css';

export const AppLayout = (): ReactNode => {
  return (
    <>
      <header className={styles.header}>
        <img className={styles.logo} src="/logo.png" alt="Логотип" />
      </header>
      <Outlet />
    </>
  );
};
