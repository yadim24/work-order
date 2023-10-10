/* eslint-disable jsx-a11y/label-has-associated-control */
import { useNomenclature } from 'api/endpoints/nomenclature';
import { NomenclatureItemDto } from 'api/types/nomenclature';
import clsx from 'clsx';
import { Filter, FilterX, PackagePlus } from 'lucide-react';
import { ChangeEventHandler, FC, useState } from 'react';
import { Button } from 'shared/ui/Button';
import { Input } from 'shared/ui/Input';
import { Select } from 'shared/ui/Select';
import styles from './FilterForm.module.css';

type FilterParams = {
  onChangeSearch: (search: string) => void;
  onChangeDate: (filterDate: string | null) => void;
  onChangeIsFinished: (value: string) => void;
  onChangeProduct: (value: string) => void;
  onClose: () => void;
};

export const FilterForm: FC<FilterParams> = ({
  onChangeSearch,
  onChangeDate,
  onChangeIsFinished,
  onChangeProduct,
  onClose,
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

  const handleIsFinished: ChangeEventHandler<HTMLSelectElement> = (e) => {
    onChangeIsFinished(e.target.value);
  };

  const products = useNomenclature();

  const handleProduct: ChangeEventHandler<HTMLSelectElement> = (e) => {
    onChangeProduct(e.target.value);
  };

  return (
    <div className={styles['search-form']}>
      <Button
        className={styles['filter-button']}
        type="button"
        onClick={() => setIsActive((prevState) => !prevState)}
        title="Добавить заказ-наряд"
      >
        <PackagePlus size={18} />
      </Button>

      <Button
        className={styles['filter-button']}
        type="button"
        onClick={() => {
          setIsActive((prevState) => !prevState);
          if (isActive) onClose();
        }}
        title={isActive ? 'Сбросить фильтр' : 'Добавить фильтр'}
      >
        {isActive ? <FilterX size={18} /> : <Filter size={18} />}
      </Button>
      <Input
        type="search"
        className={styles.search}
        onChange={handleSearch}
        placeholder="Поиск"
      />
      {isActive && (
        <>
          <label className={clsx(styles.date, styles['filter-header'])}>
            <span>По дате</span>
            <Input type="date" onChange={handleDate} value={filterDate} />
          </label>
          <label className={clsx(styles.done, styles['filter-header'])}>
            <span>По готовности</span>
            <Select onChange={handleIsFinished}>
              <option value="">Не выбрано</option>
              <option value="true">Завершен</option>
              <option value="false">Не завершен</option>
            </Select>
          </label>
          <label className={clsx(styles.search, styles['filter-header'])}>
            <span>По продукции</span>
            <Select onChange={handleProduct}>
              <option value="">Не выбрано</option>
              {products.data?.map((product: NomenclatureItemDto) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </Select>
          </label>
        </>
      )}
    </div>
  );
};
