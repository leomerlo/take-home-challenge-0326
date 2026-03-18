import { Indicator } from '@/types/indicator'
import AppTable from '@/components/global/AppTable';
import { useTranslation } from 'react-i18next';
import { useMemo, useState } from 'react';
import AppBadge from '@/components/global/AppBadge';
import AppConfidenceBar from '@/components/global/AppConfidenceBar';
import AppTags from '@/components/global/AppTags';
import { formatTimeAgo } from '@/helpers/dateHelpers';
import { TAG_VARIANTS, TYPE_ICONS } from '@/helpers/indicatorHelpers';
import IndicatorsDataTableSkeleton from '@/components/dashboard/indicators/IndicatorsDataTableSkeleton';
import AppError from '@/components/global/AppError';
import AppPagination from '@/components/global/AppPagination';

type Props = {
  data: Indicator[] | undefined;
  loading: boolean;
  error: Error | null;
  onRowClick: (row: Indicator) => void;
}

const IndicatorsDataTable = (props: Props) => {
  const { data, loading, error, onRowClick } = props;
  const [selectedRows, setSelectedRows] = useState<Indicator[]>([]);
  const { t } = useTranslation();

  const cellSlots = useMemo(
    () => ({
      value: (row: Indicator) => (
        <span className={`text-(--augur-blue) font-mono truncate word-break-break-all ${row.type === 'hash' ? 'text-[11px]' : ''}`}>{row.value}</span>
      ),
      type: (row: Indicator) => (
        <div className="flex items-center gap-1 text-[11px] font-semibold uppercase text-(--text-secondary) tracking-[.5px]">
          <span className="text-(--text-secondary)">{TYPE_ICONS[row.type] ?? '•'} {t(`indicators.table.type.${row.type}`)}</span>
        </div>
      ),
      severity: (row: Indicator) => (
        <AppBadge
          severity={row.severity}
        >
          {t(`indicators.table.severity.${row.severity}`)}
        </AppBadge>
      ),
      confidence: (row: Indicator) => (
        <AppConfidenceBar
          confidence={row.confidence}
          variant={row.severity}
        />
      ),
      tags: (row: Indicator) => (
        <div className="flex items-center flex-wrap gap-1">
        {row.tags.map((tag) => (
          <AppTags
            key={tag}
            variant={TAG_VARIANTS[tag] ?? 'gray'}
          >
            {tag}
          </AppTags>
        ))}
        </div>
      ),
      lastSeen: (row: Indicator) => (
        <span className="text-[11px] text-(--text-tertiary)">{formatTimeAgo(row.lastSeen)}</span>
      ),
    }),
    [t]
  );

  if (loading) {
    return <IndicatorsDataTableSkeleton />;
  }

  if (error) {
    return <div className="w-full flex flex-col items-center justify-center h-full">
        <AppError message={t('indicators.table.error')} onRetry={() => false } />
      </div>
  }

  return (
    <div className="w-full">
      <AppTable
        headings={[
          { key: 'value', label: t('indicators.table.headings.value'), sortable: true },
          { key: 'type', label: t('indicators.table.headings.type'), width: '100px' },
          { key: 'severity', label: t('indicators.table.headings.severity') },
          { key: 'confidence', label: t('indicators.table.headings.confidence') },
          { key: 'source', label: t('indicators.table.headings.source') },
          { key: 'tags', label: t('indicators.table.headings.tags'), width: '250px' },
          { key: 'lastSeen', label: t('indicators.table.headings.lastSeen'), sortable: true, width: '130px' },
        ]}
        selectable={true}
        data={data ?? []}
        rowKey="id"
        cellSlots={cellSlots}
        selectedRowKeys={selectedRows.map((row) => row.id)}
        onSelectionChange={(_selectedKeys, selectedRows) => {
          setSelectedRows(selectedRows);
        }}
        onRowClick={(row) => {
          onRowClick(row);
          setSelectedRows([row]);
        }}
      />
    </div>
  )
}

export default IndicatorsDataTable