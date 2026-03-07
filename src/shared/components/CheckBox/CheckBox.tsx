import React, { type ChangeEvent } from 'react';
import classNames from 'classnames';
import styles from './styles.module.scss';

export type CheckBoxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange'
> & {
  /** Вызывается при клике на чекбокс */
  onChange: (checked: boolean) => void;
};

const CheckBox: React.FC<CheckBoxProps> = ({
  onChange,
  disabled,
  checked,
  className,
  ...props
}) => {
  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked)
  }

  return (
    <div className={classNames(styles.divWrap, className)}>
      <label className={classNames(
        styles.checkboxWrapper,
        { [styles.checkboxWrapperDisabled]: disabled }
      )}>
        <input
          type="checkbox"
          className={classNames(styles.checkbox, {
            [styles.checkboxActive]: checked
          })}
          checked={checked}
          disabled={disabled}
          onChange={handleCheckboxChange}
          {...props}
        />
      </label>

      {!disabled && checked && (
        <svg className={classNames(styles.checkboxIcon, {
          [styles.checkboxIconActive]: checked
        })}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 40 40"
          fill="none">
          <path d="M6.66663 19.3548L16.4625 30L33.3333 11.6667" stroke="#518581" stroke-width="3.33333" />
        </svg>
      )}

      {disabled && checked && (
        <svg className={classNames(styles.checkboxIcon, {
          [styles.checkboxIconActive]: checked
        })}
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none">
          <path d="M6.66663 19.3548L16.4625 30L33.3333 11.6667" stroke="black" stroke-opacity="0.2" stroke-width="3.33333" />
        </svg>
      )}
    </div>
  )
};

export default CheckBox;
