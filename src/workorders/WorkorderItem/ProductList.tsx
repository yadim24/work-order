import { useDeleteProduct, useProductList } from 'api/endpoints/workorder';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Trash2 } from 'lucide-react';
import { FC } from 'react';
import { useTypedRouteParams } from 'shared/reactRouter/useTypedParams';
import { Button } from 'shared/ui/Button';
import { invariant } from 'shared/utils/invariant';
import styles from './ProductList.module.css';

export const ProductList: FC = () => {
  const { workorderId } = useTypedRouteParams();
  invariant(!!workorderId, 'workorderId должен иметь тип string');
  const productListQuery = useProductList({ workorderId });

  const deleteProductQuery = useDeleteProduct({ workorderId });

  return (
    <tbody>
      {productListQuery.data?.map((product) => (
        <tr key={product.id}>
          <td className={styles.td}>
            {format(new Date(product.date), 'Pp', { locale: ru })}
          </td>
          <td className={styles.td}>{product.serial}</td>
          <td className={styles.td}>{product.weight}</td>
          <td className={styles.td}>
            {' '}
            <Button
              type="button"
              onClick={() =>
                deleteProductQuery.mutate({ productId: product.id.toString() })
              }
            >
              <Trash2 size={20} />
            </Button>
          </td>
        </tr>
      ))}
    </tbody>
  );
};
