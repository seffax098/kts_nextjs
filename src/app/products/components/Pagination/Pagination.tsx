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

  const isFirst = page === 1;
  const isLast = page === totalPages;

  return (
    <div className={`${styles.pagination}`}>
      <button
        type="button"
        className={styles.arrow}
        onClick={() => goToPage(page - 1)}
        disabled={isFirst}
        aria-label="Previous page"
      >
        <ArrowRight
          className={styles.leftIcon}
          color={isFirst ? 'disabled' : 'primary'}
          width={35}
          height={35}
          aria-hidden="true"
        />
      </button>
      <div className={`${styles.pages__list}`}>
        {pages.map((p) => typeof p === 'string' ? (
          <span key={p} className={styles.gap}>…</span>
        ) : (
          <button
            key={p}
            type="button"
            className={`${styles.pagination__page} ${p === page ? styles.active : ''}`}
            onClick={() => goToPage(p)}
            aria-current={p === page ? 'page' : undefined}
          >
            {p}
          </button>
        ))}
      </div>
      <button
        type="button"
        className={styles.arrow}
        onClick={() => goToPage(page + 1)}
        disabled={isLast}
        aria-label="Next page"
      >
        <ArrowRight
          color={isLast ? 'disabled' : 'primary'}
          width={35}
          height={35}
          aria-hidden="true"
        />
      </button>
    </div>
  );
};

export default memo(Pagination);
