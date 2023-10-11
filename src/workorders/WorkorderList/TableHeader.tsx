import { MoveDown, MoveUp, MoveVertical } from 'lucide-react';
import { FC, ReactNode } from 'react';
import styles from './TableHeader.module.css';

type Props = {
  children: ReactNode;
  isSorted: boolean;
  sortedField?: string;
  value: string;
  onSortClick: () => void;
};

export const TableHeader: FC<Props> = ({
  children,
  isSorted,
  sortedField,
  value,
  onSortClick,
}) => {
  return (
    <th className={styles.th}>
      {isSorted ? (
        <button type="button" onClick={onSortClick} className={styles.button}>
          <span>{children}</span>
          {isSorted && !sortedField?.includes(value) && (
            <MoveVertical size={18} />
          )}
          {isSorted &&
            sortedField?.endsWith(value) &&
            sortedField?.startsWith('-') && <MoveUp size={18} />}
          {isSorted && sortedField === value && <MoveDown size={18} />}
        </button>
      ) : (
        children
      )}
    </th>
  );
};
