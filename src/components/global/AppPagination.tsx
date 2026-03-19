import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import AppButton from '@/components/global/AppButton';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type Props = {
  total: number
  page: number
  limit: number
  elements: string
  onPageChange: (page: number) => void
  siblingCount?: number
  boundaryCount?: number
}

function getPaginationItems(
  currentPage: number,
  totalPages: number,
  siblingCount: number,
  boundaryCount: number
): (number | 'ellipsis')[] {
  if (totalPages <= 0) return [];

  const leftSibling = Math.max(currentPage - siblingCount, 1);
  const rightSibling = Math.min(currentPage + siblingCount, totalPages);

  const showLeftEllipsis = leftSibling > boundaryCount + 1;
  const showRightEllipsis = rightSibling < totalPages - boundaryCount;

  const items: (number | 'ellipsis')[] = [];
  const set = new Set<number>();

  for (let i = 1; i <= Math.min(boundaryCount, totalPages); i++) {
    items.push(i);
    set.add(i);
  }

  if (showLeftEllipsis) {
    items.push('ellipsis');
  }

  for (let i = leftSibling; i <= rightSibling; i++) {
    if (!set.has(i)) {
      items.push(i);
      set.add(i);
    }
  }

  if (showRightEllipsis) {
    items.push('ellipsis');
  }

  if (totalPages > 1) {
    for (let i = Math.max(totalPages - boundaryCount + 1, 1); i <= totalPages; i++) {
      if (!set.has(i)) {
        items.push(i);
      }
    }
  }

  return items;
}

const AppPagination = (props: Props) => {
  const {
    total,
    page,
    limit,
    elements,
    onPageChange,
    siblingCount = 2,
    boundaryCount = 1,
  } = props;
  const { t } = useTranslation();

  const totalPages = Math.ceil(total / limit);
  const initial = total > 0 ? (page - 1) * limit + 1 : 0;
  const end = Math.min(page * limit, total);

  const paginationItems = useMemo(
    () => getPaginationItems(page, totalPages, siblingCount, boundaryCount),
    [page, totalPages, siblingCount, boundaryCount]
  );

  if (totalPages <= 0) return null;

  return (
    <div className="flex items-center justify-between">
      <div>
        <span className="text-xs text-(--text-tertiary)">
          {t('global.pagination.total', { initial, end, total, elements })}
        </span>
      </div>
      <div className="flex items-center gap-[2px]">
        <AppButton
          variant="secondary"
          className="h-[30px] w-[30px]"
          size="small"
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          aria-label={t('global.pagination.previous')}
        >
          <ChevronLeft size={8} />
        </AppButton>

        {paginationItems.map((item, index) =>
          item === 'ellipsis' ? (
            <span
              key={`ellipsis-${index}`}
              className="flex h-[30px] w-[30px] items-center justify-center text-2xs text-(--text-tertiary)"
            >
              …
            </span>
          ) : (
            <AppButton
              key={item}
              variant={item === page ? 'primary' : 'secondary'}
              className="h-[30px] w-[30px]"
              size="small"
              onClick={() => onPageChange(item)}
              aria-label={t('global.pagination.page', { page: item })}
              aria-current={item === page ? 'page' : undefined}
            >
              <span className="text-2xs">{item}</span>
            </AppButton>
          )
        )}

        <AppButton
          variant="secondary"
          className="h-[30px] w-[30px]"
          size="small"
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          aria-label={t('global.pagination.next')}
        >
          <ChevronRight size={8} />
        </AppButton>
      </div>
    </div>
  );
};

export default AppPagination;