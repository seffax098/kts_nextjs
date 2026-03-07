import React from 'react';
import classNames from 'classnames';
import Text from '../Text';
import styles from './styles.module.scss';
import Image from 'next/image';

export type CardProps = {
    /** Дополнительный classname */
    className?: string,
    /** URL изображения */
    image: string;
    /** Слот над заголовком */
    captionSlot?: React.ReactNode;
    /** Заголовок карточки */
    title: React.ReactNode;
    /** Описание карточки */
    subtitle: React.ReactNode;
    /** Содержимое карточки (футер/боковая часть), может быть пустым */
    contentSlot?: React.ReactNode;
    /** Клик на карточку */
    onClick?: React.MouseEventHandler;
    /** Слот для действия */
    actionSlot?: React.ReactNode;
};

const Card: React.FC<CardProps> = ({
    className,
    image,
    captionSlot,
    title,
    subtitle,
    contentSlot,
    onClick,
    actionSlot,
    ...props
}) => {
    return (
        <article className={classNames(styles.card, className)} onClick={onClick} {...props}>
            <div className={styles.cardHeader}>
                <Image src={image} alt="Фото товара" className={styles.cardImage} width={400} height={400} loading="eager"/>
            </div>
            <div className={styles.cardBody}>
                <div className={styles.cardText}>
                    {captionSlot && <p className={styles.captionSlot}>{captionSlot}</p>}
                    <Text
                        className={styles.cardTitle}
                        view='p-20'
                        weight='medium'
                        color='primary'
                        maxLines={2}
                    >{title}</Text>
                    <Text
                        className={styles.cardSubtitle}
                        view='p-16'
                        color='secondary'
                        maxLines={3}
                    >{subtitle}</Text>
                </div>
                <div className={styles.cardFooter}>
                    <div className={styles.cardContentSlot}>
                        {contentSlot}
                    </div>
                    <div className={styles.cardActionSlot}>
                        {actionSlot}
                    </div>
                </div>
            </div>
        </article>
    )
};

export default Card;
