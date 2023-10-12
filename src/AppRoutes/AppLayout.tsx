import { ReactNode } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { tokenStore } from 'shared/token';
import { Button } from 'shared/ui/Button';
import styles from './AppLayout.module.css';

export const AppLayout = (): ReactNode => {
  const navigate = useNavigate();

  return (
    <>
      <header className={styles.header}>
        <Link to="/workorders">
          <img className={styles.logo} src="/logo.png" alt="Логотип" />
        </Link>
        <Button
          type="button"
          onClick={() => {
            tokenStore.deleteToken();
            navigate('/login');
          }}
        >
          Выйти
        </Button>
      </header>
      <Outlet />
    </>
  );
};
