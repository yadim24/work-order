import { zodResolver } from '@hookform/resolvers/zod';
import { useNomenclature } from 'api/endpoints/nomenclature';
import {
  useCreateWorkorder,
  useUpdateWorkorder,
  useWorkorderItem,
} from 'api/endpoints/workorder';
import { FC, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTypedRouteParams } from 'shared/reactRouter/useTypedParams';
import { Button } from 'shared/ui/Button';
import { Input } from 'shared/ui/Input';
import { Select } from 'shared/ui/Select';
import { z } from 'zod';
import styles from './CreateWorkorder.module.css';

const validateWorkorder = z.object({
  number: z.string(),
  start_date: z.string().transform((value) => value || null),
  material: z.string(),
  product: z.string(),
});

type WorkorderFormValues = z.infer<typeof validateWorkorder>;

type Props = {
  onCloseModal: () => void;
};

export const CreateWorkorder: FC<Props> = ({ onCloseModal }) => {
  const { workorderId } = useTypedRouteParams();
  const workorderQuery = useWorkorderItem(
    { workorderId: workorderId as string },
    { enabled: !!workorderId },
  );

  const {
    register,
    handleSubmit,
    reset,
    resetField,
    formState: { errors },
  } = useForm<WorkorderFormValues>({
    resolver: zodResolver(validateWorkorder),
    defaultValues: {
      number: '',
      start_date: '',
      material: '',
      product: '',
    },
  });

  useEffect(() => {
    if (workorderQuery.data?.id) {
      reset({
        number: workorderQuery.data.number,
        start_date: workorderQuery.data.start_date,
        material: workorderQuery.data.material.id.toString(),
        product: workorderQuery.data.product.id.toString(),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workorderQuery.data]);

  const productsQuery = useNomenclature(
    {},
    {
      onSuccess: () => {
        resetField('material');
        resetField('product');
      },
    },
  );
  const createWorkorderMutation = useCreateWorkorder();
  const updateWorkorderMutation = useUpdateWorkorder({
    workorderId: workorderId as string,
  });

  const onSubmit: SubmitHandler<WorkorderFormValues> = (formValues) => {
    if (workorderId) {
      updateWorkorderMutation.mutate(formValues);
    } else {
      createWorkorderMutation.mutate(formValues);
    }

    onCloseModal();
  };

  return (
    <div className={styles['popup-backdrop']}>
      <div className={styles.popup}>
        <button type="button" className={styles.close} onClick={onCloseModal}>
          X
        </button>
        <form
          className={styles['popup-form']}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className={styles['popup-input']}>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="number">№ заказ-наряда:</label>
            <Input id="number" type="text" {...register('number')} />
            <span className={styles['error-message']}>
              {errors.number ? errors.number.message : <>&nbsp;</>}
            </span>
          </div>
          <div className={styles['popup-input']}>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="start_date">Дата:</label>
            <Input id="start_date" type="date" {...register('start_date')} />
            <span className={styles['error-message']}>
              {errors.start_date ? errors.start_date.message : <>&nbsp;</>}
            </span>
          </div>
          <div className={styles['popup-input']}>
            <span>Сырьё</span>
            <Select id="material" {...register('material')}>
              <option value="">Не выбрано</option>
              {productsQuery.data?.map((product) => (
                <option key={`material-${product.id}`} value={product.id}>
                  {product.code} - {product.name}
                </option>
              ))}
            </Select>
            <span className={styles['error-message']}>
              {errors.material ? errors.material.message : <>&nbsp;</>}
            </span>
          </div>
          <div className={styles['popup-input']}>
            <span>Продукция</span>
            <Select id="product" {...register('product')}>
              <option value="">Не выбрано</option>
              {productsQuery.data?.map((product) => (
                <option key={`product-${product.id}`} value={product.id}>
                  {product.code} - {product.name}
                </option>
              ))}
            </Select>
            <span className={styles['error-message']}>
              {errors.product ? errors.product.message : <>&nbsp;</>}
            </span>
          </div>
          <Button type="submit">Добавить</Button>
        </form>
      </div>
    </div>
  );
};