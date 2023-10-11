import { ReactNode } from 'react';
import { Link, Outlet } from 'react-router-dom';
import styles from './AppLayout.module.css';

export const AppLayout = (): ReactNode => {
  return (
    <>
      <header className={styles.header}>
        <Link to="/workorders">
          <img className={styles.logo} src="/logo.png" alt="Логотип" />
        </Link>
      </header>
      <Outlet />
    </>
  );
};
