import clsx from 'clsx';
import { ButtonHTMLAttributes, FC } from 'react';
import styles from './Button.module.css';

export const Button: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  className,
  ...restProps
}) => {
  return (
    // eslint-disable-next-line react/button-has-type
    <button {...restProps} className={clsx(styles.button, className)}>
      {children}
    </button>
  );
};
