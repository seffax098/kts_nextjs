import ArrowRight from '@shared/components/icons/ArrowRight';
import styles from './Pagination.module.scss';
import { memo } from 'react';

interface Props {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

const Pagination = ({ page, totalPages, onChange }: Props) => {
  const goToPage = (p: number) => {
    if (p < 1 || p > totalPages) return;
    onChange(p);
  };

  const start = Math.max(1, page - 1);
  const end = Math.min(totalPages, page + 2);

  const pages: (number | 'gap-start' | 'gap-end')[] = [];

  if (start > 1) {
    pages.push(1);
    if (start > 2) pages.push('gap-start');
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (end < totalPages) {
    if (end < totalPages - 1) pages.push('gap-end');
    pages.push(totalPages);
  }

  return (
    <div className={`${styles.pagination}`}>
      <ArrowRight
        className={`${styles.leftIcon} ${page !== 1 ? styles.activeIcon : ''}`}
        color={page === 1 ? 'disabled' : 'primary'}
        onClick={() => goToPage(page - 1)}
        width={35}
        height={35}
      />
      <div className={`${styles.pages__list}`}>
        {pages.map((p) => typeof p === 'string' ? (
          <span key={p} className={styles.gap}>…</span>
        ) : (
          <button
            key={p}
            className={`${styles.pagination__page} ${p === page ? styles.active : ''}`}
            onClick={() => goToPage(p)}
          >
            {p}
          </button>
        ))}
      </div>
      <ArrowRight
        className={`${styles.rightIcon} ${page !== totalPages ? styles.activeIcon : ''}`}
        color={page === totalPages ? 'disabled' : 'primary'}
        onClick={() => goToPage(page + 1)}
        width={35}
        height={35}
      />
    </div>
  );
};

export default memo(Pagination);
