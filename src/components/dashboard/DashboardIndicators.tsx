import { useIndicators } from '@/hooks/useIndicators';
import { Indicator, IndicatorFilters } from '@/types/indicator';
import IndicatorsDataFilters from '@/components/dashboard/indicators/IndicatorsDataFilters';
import IndicatorsDataTable from '@/components/dashboard/indicators/IndicatorsDataTable';
import IndicatorDetails from '@/components/dashboard/indicators/IndicatorDetails';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AppPagination from '../global/AppPagination';


const DashboardIndicators = () => {
  const { t } = useTranslation();
  const [filters, setFilters] = useState<IndicatorFilters>({
    page: 1,
    limit: 10,
    severity: undefined,
    type: undefined,
    search: '',
    sortKey: 'lastSeen',
    sortOrder: 'desc',
    source: '',
  });
  const { data, total, page, loading, error, uniqueSources } = useIndicators(filters);
  const [selectedIndicator, setSelectedIndicator] = useState<Indicator | null>(null);
  
  return (
    <div className="flex flex-col flex-1">
      <div className="px-(--sp-8) pt-(--sp-4)">
        <IndicatorsDataFilters filters={filters} setFilters={setFilters} uniqueSources={uniqueSources} />
      </div>
      <div className="flex flex-1 overflow-x-auto lg:overflow-x-visible">
        <div className="px-(--sp-8) py-(--sp-4) flex-1">
          <IndicatorsDataTable
            data={data}
            loading={loading}
            error={error}
            onRowClick={setSelectedIndicator}
            sortKey={filters.sortKey}
            sortOrder={filters.sortOrder}
            onSortChange={(sortKey, sortOrder) => {
              setFilters({ ...filters, sortKey, sortOrder, page: 1 });
            }}
          />
          <AppPagination
            total={total}
            page={page}
            limit={filters.limit ?? 10}
            elements={t('global.indicators')}
            onPageChange={(page) => {
              setFilters({ ...filters, page });
            }}
          />
        </div>
        <IndicatorDetails indicatorId={selectedIndicator?.id ?? null} onClose={() => setSelectedIndicator(null)} />
      </div>
    </div>
  )
}

export default DashboardIndicators