import { Filter } from 'lucide-react';
import { ChangeEventHandler, FC, useState } from 'react';
import { Button } from 'shared/ui/Button';
import { Input } from 'shared/ui/Input';
import { Select } from 'shared/ui/Select';
import styles from './FilterForm.module.css';

type FilterParams = {
  onChangeSearch: (search: string) => void;
  onChangeDate: (filterDate: string | null) => void;
};

export const FilterForm: FC<FilterParams> = ({
  onChangeSearch,
  onChangeDate,
}) => {
  const [isActive, setIsActive] = useState(false);
  const [filterDate, setFilterDate] = useState('');

  const handleSearch: ChangeEventHandler<HTMLInputElement> = (e) => {
    const search = e.target.value;
    onChangeSearch(search);
  };

  const handleDate: ChangeEventHandler<HTMLInputElement> = (e) => {
    // Для упрощения валивации проверяем по количеству символов в "2022-12-16"
    if (e.target.value.length === 10) {
      onChangeDate(e.target.value);
    }

    if (e.target.value.length === 0 && filterDate.length === 10) {
      onChangeDate(null);
    }

    setFilterDate(e.target.value);
  };

  return (
    <div className={styles['search-form']}>
      <Button
        className={styles['filter-button']}
        type="button"
        onClick={() => setIsActive((prevState) => !prevState)}
      >
        <Filter size={20} />
      </Button>
      <Input
        type="search"
        className={styles.search}
        onChange={handleSearch}
        placeholder="Поиск"
      />
      {isActive && (
        <>
          <Input
            className={styles.date}
            type="date"
            onChange={handleDate}
            value={filterDate}
          />
          <Select className={styles.done}>
            <option value="null">-Завершен-</option>
            <option value="true">Да</option>
            <option value="false">Нет</option>
          </Select>
          <Select className={styles.search}>
            <option>-Продукция-</option>
          </Select>
        </>
      )}
    </div>
  );
};
