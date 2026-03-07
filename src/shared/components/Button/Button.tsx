import React from 'react';
import classNames from 'classnames';
import Loader from '../Loader';
import styles from './styles.module.scss';
import Text from '../Text';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Состояние загрузки */
  loading?: boolean;
  /** Текст кнопки */
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({
  loading,
  children,
  disabled: propDisabled,
  className: exclassname,
  ...props
}) => {
  const disabled = loading || propDisabled;

  return (
    <button
      {...props}
      disabled={disabled}
      className={classNames(
        styles.button,
        { [styles.buttonLoading]: loading },
        { [styles.buttonDisabled]: propDisabled },
        exclassname
      )}
    >
      {loading && <Loader className={styles.loader} size='s' color='#FFF' />}
      <Text view='button' className={styles.buttonText}>{children}</Text>
    </button>
  )
};

export default Button;
