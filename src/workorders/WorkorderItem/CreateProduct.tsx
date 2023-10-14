import { zodResolver } from '@hookform/resolvers/zod';
import { ErrorProductDto, useCreateProduct } from 'api/endpoints/workorder';
import { CreateProductDto } from 'api/types/workorder';
import { isAxiosError } from 'axios';
import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTypedRouteParams } from 'shared/reactRouter/useTypedParams';
import { Button } from 'shared/ui/Button';
import { Input } from 'shared/ui/Input';
import { invariant } from 'shared/utils/invariant';
import { z } from 'zod';
import styles from './CreateProduct.module.css';

const validateWeight = z.object({
  weight: z
    .string()
    .regex(/^\d+(\.\d{1,3})?$/, 'Введите число в формате: 30 или 30.555'),
});

type WeightFormValue = z.infer<typeof validateWeight>;

type Props = {
  onCloseModal: () => void;
};

export const CreateProduct: FC<Props> = ({ onCloseModal }) => {
  const { workorderId } = useTypedRouteParams();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<WeightFormValue>({
    resolver: zodResolver(validateWeight),
    defaultValues: {
      weight: '',
    },
  });

  invariant(!!workorderId, 'workorderId должен иметь тип string');

  const handleError = (error: ErrorProductDto): void => {
    if (
      isAxiosError(error) &&
      error.response?.data &&
      error.response?.status === 400
    ) {
      (
        Object.entries(error.response?.data) as Array<
          [keyof CreateProductDto, string[]]
        >
      ).forEach(([fieldName, messages]) => {
        setError(fieldName, { type: 'server', message: messages.join(' ') });
      });
    }
  };

  const createProductMutation = useCreateProduct(
    { workorderId },
    { onSuccess: onCloseModal, onError: handleError },
  );

  const onSubmit: SubmitHandler<WeightFormValue> = (formValue) => {
    createProductMutation.mutate(formValue);
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
            <label htmlFor="weight">Введите количество, кг:</label>
            <Input id="weight" type="text" {...register('weight')} />
            <span className={styles['error-message']}>
              {errors.weight ? errors.weight.message : <>&nbsp;</>}
            </span>
          </div>
          <Button type="submit">Добавить</Button>
        </form>
      </div>
    </div>
  );
};
