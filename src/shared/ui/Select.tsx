import clsx from 'clsx';
import { ReactNode, SelectHTMLAttributes, forwardRef } from 'react';
import styles from './Select.module.css';

type Props = SelectHTMLAttributes<HTMLSelectElement> & {
  children?: ReactNode;
};

export const Select = forwardRef<HTMLSelectElement, Props>(
  ({ children, className, ...restProps }, ref) => {
    return (
      <select
        {...restProps}
        className={clsx(styles.select, className)}
        ref={ref}
      >
        {children}
      </select>
    );
  },
);
