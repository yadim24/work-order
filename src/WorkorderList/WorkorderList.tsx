import { useWorkorderList } from 'api/endpoints/workorder';
import { ReactElement } from 'react';
import { useSearchParams } from 'react-router-dom';
import { invariant } from 'shared/invariant';
import { useDebounce } from 'shared/useDebounce';
import { workorderListSearchParamsScheme } from 'shared/zodScheme';
import styles from './WorkorderList.module.css';

export const WorkorderList = (): ReactElement => {
  const [searchParams, setSarchParams] = useSearchParams();

  const validatedWorkorderListSearchParams =
    workorderListSearchParamsScheme.safeParse(Object.fromEntries(searchParams));

  invariant(
    validatedWorkorderListSearchParams.success,
    'SearchParams не валидны',
  );

  const validatedSearchParams = validatedWorkorderListSearchParams.data;

  const debounceSearch = useDebounce(validatedSearchParams.search || '', 500);

  const getWorkorderList = useWorkorderList({
    ...validatedSearchParams,
    search: debounceSearch || undefined,
  });

  return (
    <main>
      <h1 className={styles.header}>Заказы-наряды</h1>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr className={styles.tr}>
            <th className={styles.th}>Заказ-наряд</th>
            <th className={styles.th}>Завершен</th>
            <th className={styles.th}>Дата</th>
            <th className={styles.th}>Продукция</th>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {getWorkorderList.data?.results.map((order) => (
            <tr key={order.id} className={styles.tr}>
              <td className={styles.td}>{order.number}</td>
              <td className={styles.td}>{order.is_finished}</td>
              <td className={styles.td}>{order.start_date}</td>
              <td className={styles.td}>{order.product.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
};
