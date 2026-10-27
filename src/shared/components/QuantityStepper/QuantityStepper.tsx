import React from 'react';
import classNames from 'classnames';
import styles from './QuantityStepper.module.scss';

export type QuantityStepperProps = {
    value: number;
    onDecrease: () => void;
    onIncrease: () => void;
    className?: string;
};

const MinusIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M3 8H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
);

const PlusIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M3 8H13M8 3V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
);

const TrashIcon = () => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path
            d="M3 5H15M7 5V3.5C7 3.22 7.22 3 7.5 3H10.5C10.78 3 11 3.22 11 3.5V5M4.5 5L5.2 14.1C5.24 14.6 5.66 15 6.17 15H11.83C12.34 15 12.76 14.6 12.8 14.1L13.5 5M7.5 8V12M10.5 8V12"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

const QuantityStepper: React.FC<QuantityStepperProps> = ({ value, onDecrease, onIncrease, className }) => {
    const handle = (action: () => void) => (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
        action();
    };

    const willRemove = value <= 1;

    return (
        <div className={classNames(styles.stepper, className)}>
            <button
                type="button"
                className={classNames(styles.button, { [styles.buttonRemove]: willRemove })}
                onClick={handle(onDecrease)}
                aria-label={willRemove ? 'Remove from cart' : 'Decrease quantity'}
            >
                {willRemove ? <TrashIcon /> : <MinusIcon />}
            </button>

            <span key={value} className={styles.value} aria-live="polite">
                {value}
            </span>

            <button
                type="button"
                className={styles.button}
                onClick={handle(onIncrease)}
                aria-label="Increase quantity"
            >
                <PlusIcon />
            </button>
        </div>
    );
};

export default QuantityStepper;
