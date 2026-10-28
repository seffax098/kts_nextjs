import React from 'react';
import classNames from 'classnames';
import styles from './Rating.module.scss';

export type RatingProps = {
    value: number;
    max?: number;
    size?: 's' | 'm' | 'l';
    showValue?: boolean;
    className?: string;
};

const STAR_PATH = 'M12 2.5l2.94 5.96 6.56.95-4.75 4.63 1.12 6.54L12 17.5l-5.87 3.08 1.12-6.54L2.5 9.41l6.56-.95L12 2.5z';

const Stars = ({ count }: { count: number }) => (
    <>
        {Array.from({ length: count }, (_, i) => (
            <svg key={i} className={styles.star} viewBox="0 0 24 24" aria-hidden="true">
                <path d={STAR_PATH} />
            </svg>
        ))}
    </>
);

const Rating: React.FC<RatingProps> = ({ value, max = 5, size = 's', showValue = true, className }) => {
    const clamped = Math.min(Math.max(value, 0), max);
    const percent = (clamped / max) * 100;
    const label = clamped.toFixed(1);

    return (
        <span
            className={classNames(styles.rating, styles[`rating-${size}`], className)}
            role="img"
            aria-label={`Rating ${label} out of ${max}`}
        >
            <span className={styles.stars}>
                <span className={styles.starsEmpty}>
                    <Stars count={max} />
                </span>
                <span className={styles.starsFilled} style={{ width: `${percent}%` }}>
                    <Stars count={max} />
                </span>
            </span>
            {showValue && <span className={styles.value} aria-hidden="true">{label}</span>}
        </span>
    );
};

export default Rating;
