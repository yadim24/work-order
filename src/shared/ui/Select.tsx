import clsx from 'clsx';
import { FC, ReactNode, SelectHTMLAttributes } from 'react';
import styles from './Select.module.css';

type InputSelect = SelectHTMLAttributes<HTMLSelectElement> & {
  children: ReactNode;
};

export const Select: FC<InputSelect> = ({
  children,
  className,
  ...restProps
}) => {
  return (
    <select {...restProps} className={clsx(styles.select, className)}>
      {children}
    </select>
  );
};
