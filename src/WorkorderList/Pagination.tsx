import clsx from 'clsx';
import { FC } from 'react';
import styles from './Pagination.module.css';

type Props = {
  count: number;
  activePage: number;
  onChangePage: (page: number) => void;
};

export const Pagination: FC<Props> = ({ count, activePage, onChangePage }) => {
  const pagesQty = Math.ceil(count / 10);
  const pagesBtn = Array.from({ length: pagesQty }).map(
    (_item, index) => index + 1,
  );

  return (
    <div className={styles.pagination}>
      <button
        type="button"
        className={clsx(styles['page-back-next'], {
          [styles.visibility!]: activePage === 1,
        })}
        onClick={() => onChangePage(activePage - 1)}
      >
        Назад
      </button>
      <div>
        {pagesBtn.map((page) => (
          <button
            type="button"
            key={`page${page}`}
            className={clsx(
              { [styles.active!]: activePage === page },
              styles.pages,
            )}
            onClick={() => onChangePage(page)}
          >
            {page}
          </button>
        ))}
      </div>
      <button
        type="button"
        className={clsx(styles['page-back-next'], {
          [styles.visibility!]: activePage === pagesQty,
        })}
        onClick={() => onChangePage(activePage + 1)}
      >
        Вперёд
      </button>
    </div>
  );
};
