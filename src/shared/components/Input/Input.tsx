import React from 'react';
import classNames from 'classnames';
import styles from './styles.module.scss';

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'value'
> & {
  value: string;
  onChange: (value: string) => void;
  afterSlot?: React.ReactNode;

  inputClassName?: string;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      value,
      onChange,
      afterSlot,
      className,
      inputClassName,
      placeholder,
      ...props
    },
    ref
  ) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    };

    return (
      <div className={classNames(styles.wrapper, className)}>
        <input
          ref={ref}
          className={classNames(styles.input, inputClassName)}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          {...props}
        />

        {afterSlot && (
          <div className={styles.afterSlot}>
            {afterSlot}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;