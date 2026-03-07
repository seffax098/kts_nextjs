import * as React from 'react'
import clsx from 'classnames';
import styles from './Text.module.scss';

export type TextProps = {
    /** Дополнительный класс */
    className?: string;
    /** Стиль отображения */
    view?: 'title' | 'subtitle' | 'button' | 'p-20' | 'p-18' | 'p-16' | 'p-14';
    /** Html-тег */
    tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'p' | 'span';
    /** Начертание шрифта */
    weight?: 'normal' | 'medium' | 'bold';
    /** Контент */
    children: React.ReactNode;
    /** Цвет */
    color?: 'primary' | 'secondary' | 'accent';
    /** Максимальное кол-во строк */
    maxLines?: number;
};

const Text: React.FC<TextProps> = ({ className, view = 'p-16', tag = 'p', weight, children, color, maxLines }: TextProps) => {
    const Element = tag;

    const classes = clsx(
        styles.text,
        styles[view],
        {
            [styles[`weight-${weight}`]]: weight,
            [styles[color!]]: color,
            [styles.clamp]: maxLines,
        },
        className
    );

    const style = maxLines
        ? {
            WebkitLineClamp: maxLines,
        }
        : undefined;

    return (
        <Element className={classes} style={style}>
            {children}
        </Element>
    )
};

export default Text;
