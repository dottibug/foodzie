import React, { Fragment, forwardRef } from 'react';
import styles from './Input.module.css';

const Input = forwardRef(function Input(
  { label, children, ...rest },
  ref
) {
  return (
    <Fragment>
      <label htmlFor={label} className={styles['input']}>
        {children}
      </label>
      <input
        id={label}
        {...rest}
        ref={ref}
        className={styles['input']}
      />
    </Fragment>
  );
});

export default Input;
