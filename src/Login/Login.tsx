import { zodResolver } from '@hookform/resolvers/zod';
import { useLogin } from 'api/endpoints/login';
import { ReactElement } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import { tokenStore } from 'shared/token';
import { Button } from 'shared/ui/Button';
import { Input } from 'shared/ui/Input';
import { z } from 'zod';
import styles from './Login.module.css';

const validateAuth = z.object({
  username: z.string().min(1, 'Обязательное поле'),
  password: z.string().min(3, 'Минимум 3 символа'),
});

type LoginFormValues = z.infer<typeof validateAuth>;

export const Login = (): ReactElement => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(validateAuth),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const loginMutation = useLogin();
  const errorMessages =
    loginMutation.error?.response?.data?.non_field_errors ?? [];

  const onSubmit: SubmitHandler<LoginFormValues> = (formValues) => {
    loginMutation.mutate(formValues);
  };

  return (
    <>
      {tokenStore.getToken() && <Navigate to="/workorders" replace />}
      <header className={styles.header}>
        <img className={styles.logo} src="/logo.png" alt="Логотип" />
      </header>
      <div className={styles.popup}>
        <form
          className={styles['popup-form']}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className={styles['popup-input']}>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="username">Имя пользователя:</label>
            <Input id="username" type="text" {...register('username')} />
            <span className={styles['error-message']}>
              {errors.username ? errors.username.message : <>&nbsp;</>}
            </span>
          </div>
          <div className={styles['popup-input']}>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="password">Пароль:</label>
            <Input id="password" type="password" {...register('password')} />
            <span className={styles['error-message']}>
              {errors.password ? errors.password.message : <>&nbsp;</>}
            </span>
          </div>
          <Button type="submit">Войти</Button>
          {errorMessages.map((errorMsg) => (
            <p className={styles['error-message']} key={errorMsg}>
              {errorMsg}
            </p>
          ))}
        </form>
      </div>
    </>
  );
};
