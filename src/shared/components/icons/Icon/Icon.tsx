import * as React from 'react';
import classNames from 'classnames';
import styles from './styles.module.scss';

export type IconProps = React.SVGAttributes<SVGElement> & {
    className?: string;
    color?: 'primary' | 'secondary' | 'accent' | 'disabled';
};

const Icon: React.FC<React.PropsWithChildren<IconProps>> = ({
    width = 24,
    height = 24,
    color,
    className,
    children,
    ...props
}) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            fill="none"
            className={classNames(
                styles.icon,
                color && styles[`icon-${color}`],
                className
            )}
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            {children}
        </svg>
    );
};

export default Icon;
