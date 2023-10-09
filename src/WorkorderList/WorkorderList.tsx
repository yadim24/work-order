import { useWorkorderList } from 'api/endpoints/workorder';
import clsx from 'clsx';
import { PackageCheck, PackageX } from 'lucide-react';
import { ReactElement } from 'react';
import { useSearchParams } from 'react-router-dom';
import { invariant } from 'shared/invariant';
import { useDebounce } from 'shared/useDebounce';
import { workorderListSearchParamsScheme } from 'shared/zodScheme';
import { FilterForm } from './FilterForm';
import { Pagination } from './Pagination';
import styles from './WorkorderList.module.css';
import { QUERY_PARAM } from './constants';

export const WorkorderList = (): ReactElement => {
  const [searchParams, setSearchParams] = useSearchParams();

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

  const setFirstPage = (): void => {
    if (validatedSearchParams.page !== 1) {
      setSearchParams((prevSearchParams) => {
        prevSearchParams.set(QUERY_PARAM.PAGE, '1');

        return prevSearchParams;
      });
    }
  };

  const handleSearch = (search: string): void => {
    setFirstPage();
    setSearchParams((prevSearchParams) => {
      prevSearchParams.set(QUERY_PARAM.SEARCH, search);

      return prevSearchParams;
    });
  };

  const handleDate = (date: string | null): void => {
    setFirstPage();
    setSearchParams((prevSearchParams) => {
      if (date === null) {
        prevSearchParams.delete(QUERY_PARAM.START_DATE);
      } else {
        prevSearchParams.set(QUERY_PARAM.START_DATE, date);
      }

      return prevSearchParams;
    });
  };

  return (
    <main className={styles.main}>
      <h1 className={styles.header}>Заказы-наряды</h1>
      <FilterForm onChangeSearch={handleSearch} onChangeDate={handleDate} />
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
              <td className={clsx(styles.td, styles['td-center'])}>
                {order.is_finished ? (
                  <PackageCheck size={24} color="#00850f" />
                ) : (
                  <PackageX size={24} color="#ca3e47" />
                )}
              </td>
              <td className={clsx(styles.td, styles['td-center'])}>
                {order.start_date ? order.start_date : '-'}
              </td>
              <td className={styles.td}>{order.product.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        count={getWorkorderList.data?.count ? getWorkorderList.data?.count : 1}
        activePage={validatedSearchParams.page}
        onChangePage={(number) =>
          setSearchParams((prevSearchParams) => {
            prevSearchParams.set(QUERY_PARAM.PAGE, number.toString());

            return prevSearchParams;
          })
        }
      />
    </main>
  );
};
