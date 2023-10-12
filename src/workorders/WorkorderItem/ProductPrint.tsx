import { useProductItem } from 'api/endpoints/workorder';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { FC, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import { useTypedRouteParams } from 'shared/reactRouter/useTypedParams';
import { Button } from 'shared/ui/Button';
import { invariant } from 'shared/utils/invariant';
import styles from './ProductPrint.module.css';

export const ProductPrint: FC = () => {
  const { workorderId, productId } = useTypedRouteParams();
  invariant(!!workorderId, 'workorderId должен иметь тип string');
  invariant(!!productId, 'productId должен иметь тип string');

  const productItemQuery = useProductItem({ workorderId, productId });
  const navigate = useNavigate();

  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div className={styles['label-wrapper']}>
      <div className={styles.label} ref={componentRef}>
        <h1 className={styles.header}>ООО ПОЛИПАК</h1>
        <p>
          Дата:{' '}
          {productItemQuery.data?.date
            ? format(new Date(productItemQuery.data.date), 'P', {
                locale: ru,
              })
            : '-'}
        </p>
        <p>Серийный №: {productItemQuery.data?.serial}</p>
        <p>Вес, кг: {productItemQuery.data?.weight}</p>
      </div>
      <div className={styles['buttons-wrapper']}>
        <Button type="button" onClick={handlePrint}>
          Печать
        </Button>
        <Button type="button" onClick={() => navigate('..')}>
          Отмена
        </Button>
      </div>
    </div>
  );
};
