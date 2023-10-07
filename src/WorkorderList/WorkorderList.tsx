import { ReactElement } from 'react';
import styles from './WorkorderList.module.css';

export const WorkorderList = (): ReactElement => {
  return (
    <main>
      <h1 className={styles.header}>Заказы-наряды</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>N</th>
            <th>Заказ-наряд</th>
            <th>Завершен</th>
            <th>Дата</th>
            <th>Продукция</th>
          </tr>
        </thead>
      </table>
    </main>
  );
};
