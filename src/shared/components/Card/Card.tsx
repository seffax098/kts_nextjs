'use client';
import React from 'react';
import classNames from 'classnames';
import Text from '../Text';
import styles from './styles.module.scss';
import Image from 'next/image';
import { useInView } from '@shared/utils/useInView';

const IMAGE_PRELOAD_MARGIN = '800px 0px';

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
    preload?: boolean;
    imageAlt?: string;
};

const Card: React.FC<CardProps> = ({
    className,
    image,
    imageAlt = '',
    captionSlot,
    title,
    subtitle,
    contentSlot,
    onClick,
    actionSlot,
    preload = false,
    ...props
}) => {
    const [headerRef, nearViewport] = useInView<HTMLDivElement>(IMAGE_PRELOAD_MARGIN, !preload);

    return (
        <article className={classNames(styles.card, className)} onClick={onClick} {...props}>
            <div ref={headerRef} className={styles.cardHeader}>
                {nearViewport && (
                    <Image
                        src={image}
                        alt={imageAlt}
                        className={styles.cardImage}
                        width={400}
                        height={400}
                        sizes="(max-width: 768px) 95vw, (max-width: 1024px) 48vw, 400px"
                        preload={preload}
                        loading={preload ? undefined : "eager"}
                    />
                )}
            </div>
            <div className={styles.cardBody}>
                <div className={styles.cardText}>
                    {captionSlot && <div className={styles.captionSlot}>{captionSlot}</div>}
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
