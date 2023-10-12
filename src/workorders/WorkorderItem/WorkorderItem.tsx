import { useDeleteWorkorder, useWorkorderItem } from 'api/endpoints/workorder';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { FileEdit, PackagePlus, Trash2 } from 'lucide-react';
import { FC, useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { useTypedRouteParams } from 'shared/reactRouter/useTypedParams';
import { Button } from 'shared/ui/Button';
import { invariant } from 'shared/utils/invariant';
import { CreateWorkorder } from 'workorders/shared/CreateWorkorder';
import { CreateProduct } from './CreateProduct';
import { ProductList } from './ProductList';
import styles from './WorkorderItem.module.css';

export const WorkorderItem: FC = () => {
  const { workorderId } = useTypedRouteParams();
  const [isActive, setIsActive] = useState(false);
  const [updateWorkorderIsActive, setUpdateWorkorderIsActive] = useState(false);
  const navigate = useNavigate();

  invariant(!!workorderId, 'workorderId должен иметь тип string');
  const workorderItemQuery = useWorkorderItem({ workorderId });

  const deleteWorkorderMutation = useDeleteWorkorder(
    { workorderId },
    {
      onSuccess: () => {
        navigate('..');
      },
    },
  );

  return (
    <main className={styles.main}>
      <h1 className={styles.header}>
        <span className={styles['header-name']}>Заказ-наряд: </span>
        {workorderItemQuery.data?.number}
      </h1>
      <div className={styles['order-container']}>
        <div className={styles['order-detail-container']}>
          <div className={styles['order-detail']}>
            <h2 className={styles['order-detail-header']}>Дата:</h2>
            <p>
              {workorderItemQuery.data?.start_date
                ? format(new Date(workorderItemQuery.data.start_date), 'Pp', {
                    locale: ru,
                  })
                : '-'}
            </p>
          </div>
          <div className={styles['order-detail']}>
            <h2 className={styles['order-detail-header']}>Материал:</h2>
            <p>
              {workorderItemQuery.data?.material.code} -{' '}
              {workorderItemQuery.data?.material.name}
            </p>
          </div>
          <div className={styles['order-detail']}>
            <h2 className={styles['order-detail-header']}>Продукция:</h2>
            <p>
              {workorderItemQuery.data?.product.code} -{' '}
              {workorderItemQuery.data?.product.name}
            </p>
          </div>
          <div className={styles['order-detail']}>
            <h2 className={styles['order-detail-header']}>Статус:</h2>
            <p>
              {workorderItemQuery.data?.is_finished ? 'Завершен' : 'В работе'}
            </p>
          </div>
          <div className={styles['order-detail-button']}>
            <Button
              type="button"
              onClick={() =>
                setUpdateWorkorderIsActive((prevState) => !prevState)
              }
            >
              <FileEdit size={20} />
            </Button>
            <Button
              type="button"
              onClick={() => deleteWorkorderMutation.mutate()}
            >
              <Trash2 size={20} />
            </Button>
          </div>
        </div>
        <div className={styles['product-container']}>
          <div className={styles['header-wrapper']}>
            <Button
              type="button"
              onClick={() => setIsActive((prevState) => !prevState)}
            >
              <PackagePlus size={20} />
            </Button>
            <h2 className={styles['product-header']}>
              Произведенная продукция:
            </h2>
          </div>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.th}>Дата</th>
                <th className={styles.th}>Серийный №</th>
                <th className={styles.th}>Масса, кг</th>
                <th className={styles.th}>&nbsp;</th>
              </tr>
            </thead>
            <ProductList />
          </table>
        </div>
      </div>
      {isActive &&
        createPortal(
          <CreateProduct
            onCloseModal={() => setIsActive((prevState) => !prevState)}
          />,
          document.body,
        )}
      {updateWorkorderIsActive &&
        createPortal(
          <CreateWorkorder
            onCloseModal={() =>
              setUpdateWorkorderIsActive((prevState) => !prevState)
            }
          />,
          document.body,
        )}
    </main>
  );
};
