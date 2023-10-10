import { workorderListSearchParamsScheme } from 'WorkorderList/workorderListSearchParamsScheme';
import { useWorkorderList } from 'api/endpoints/workorder';
import clsx from 'clsx';
import { PackageCheck, PackageX } from 'lucide-react';
import { ReactElement } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDebounce } from 'shared/useDebounce';
import { invariant } from 'shared/utils/invariant';
import { FilterForm } from './FilterForm';
import { Pagination } from './Pagination';
import { TableHeader } from './TableHeader';
import styles from './WorkorderList.module.css';
import { QUERY_PARAM } from './constants';

const tableFieldNames = [
  { title: 'Заказ-наряд', value: 'number', isSorted: true },
  { title: 'Завершен', value: 'is_finished', isSorted: true },
  { title: 'Дата', value: 'start_date', isSorted: true },
  { title: 'Продукция', value: 'product_id', isSorted: false },
];

export const WorkorderList = (): ReactElement => {
  const [searchParams, setSearchParams] = useSearchParams({
    page: '1',
    page_size: '10',
  });

  workorderListSearchParamsScheme.parse(Object.fromEntries(searchParams));

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

  const handleIsFinished = (isFinished: string): void => {
    setFirstPage();
    setSearchParams((prevSearchParams) => {
      if (!isFinished) {
        prevSearchParams.delete(QUERY_PARAM.IS_FINISHED);
      } else {
        prevSearchParams.set(QUERY_PARAM.IS_FINISHED, isFinished);
      }

      return prevSearchParams;
    });
  };

  const handleProduct = (productId: string): void => {
    setFirstPage();
    setSearchParams((prevSearchParams) => {
      if (!productId) {
        prevSearchParams.delete(QUERY_PARAM.PRODUCT_ID);
      } else {
        prevSearchParams.set(QUERY_PARAM.PRODUCT_ID, productId);
      }

      return prevSearchParams;
    });
  };

  const resetFilter = (): void => {
    setFirstPage();
    setSearchParams((prevSeachParams) => {
      prevSeachParams.delete(QUERY_PARAM.START_DATE);
      prevSeachParams.delete(QUERY_PARAM.IS_FINISHED);
      prevSeachParams.delete(QUERY_PARAM.PRODUCT_ID);

      return prevSeachParams;
    });
  };

  const handleSort = (value: string): void => {
    setFirstPage();

    if (value === validatedSearchParams.ordering) {
      setSearchParams((prevSearchParams) => {
        prevSearchParams.set(
          QUERY_PARAM.ORDERING,
          value.startsWith('-') ? value.slice(1) : `-${value}`,
        );

        return prevSearchParams;
      });
    } else {
      setSearchParams((prevSearchParams) => {
        prevSearchParams.set(QUERY_PARAM.ORDERING, value);

        return prevSearchParams;
      });
    }
  };

  return (
    <main className={styles.main}>
      <h1 className={styles.header}>Заказы-наряды</h1>
      <FilterForm
        onChangeSearch={handleSearch}
        onChangeDate={handleDate}
        onChangeIsFinished={handleIsFinished}
        onChangeProduct={handleProduct}
        onClose={resetFilter}
      />
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr className={styles.tr}>
            {tableFieldNames.map((name) => (
              <TableHeader
                key={name.value}
                isSorted={name.isSorted}
                sortedField={validatedSearchParams.ordering}
                value={name.value}
                onSortClick={() => handleSort(name.value)}
              >
                {name.title}
              </TableHeader>
            ))}
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
        pageSize={validatedSearchParams.page_size}
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
