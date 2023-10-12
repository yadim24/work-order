import { useDeleteProduct, useProductList } from 'api/endpoints/workorder';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Printer, Trash2 } from 'lucide-react';
import { FC } from 'react';
import { Link } from 'react-router-dom';
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
            <div className={styles['button-wrapper']}>
              <div className={styles.print}>
                <Link
                  className={styles.link}
                  to={`products_print/${product.id.toString()}`}
                >
                  <Printer size={20} />
                </Link>
              </div>
              <Button
                type="button"
                onClick={() =>
                  deleteProductQuery.mutate({
                    productId: product.id.toString(),
                  })
                }
              >
                <Trash2 size={20} />
              </Button>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  );
};
