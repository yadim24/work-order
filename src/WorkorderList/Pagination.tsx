import clsx from 'clsx';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { FC } from 'react';
import styles from './Pagination.module.css';

type Props = {
  count: number;
  activePage: number;
  pageSize: number;
  onChangePage: (page: number) => void;
};

export const Pagination: FC<Props> = ({
  count,
  activePage,
  pageSize,
  onChangePage,
}) => {
  const pagesQty = Math.ceil(count / pageSize);
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
        title="Предыдущая страница"
      >
        <ChevronLeft size={28} />
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
        title="Следующая страница"
      >
        <ChevronRight size={28} />
      </button>
    </div>
  );
};
