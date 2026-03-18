import { useIndicators } from '@/hooks/useIndicators';
import { Indicator, IndicatorFilters } from '@/types/indicator';
import IndicatorsDataFilters from '@/components/dashboard/indicators/IndicatorsDataFilters';
import IndicatorsDataTable from '@/components/dashboard/indicators/IndicatorsDataTable';
import IndicatorDetails from '@/components/dashboard/indicators/IndicatorDetails';
import { useState } from 'react';
import AppError from '../global/AppError';


const DashboardIndicators = () => {
  const [filters, setFilters] = useState<IndicatorFilters>({
    page: 1,
    limit: 10,
    severity: undefined,
    type: undefined,
    search: '',
  });
  const { data, loading, error } = useIndicators(filters);
  const [selectedIndicator, setSelectedIndicator] = useState<Indicator | null>(null);
  
  return (
    <div className="flex flex-col flex-1">
      <div className="px-(--sp-8) pt-(--sp-4)">
        <IndicatorsDataFilters filters={filters} setFilters={setFilters} />
      </div>
      <div className="flex flex-1">
        <div className="px-(--sp-8) py-(--sp-4) flex-1">
          <IndicatorsDataTable data={data} loading={loading} error={error} onRowClick={setSelectedIndicator} />
        </div>
        <IndicatorDetails indicatorId={selectedIndicator?.id ?? null} onClose={() => setSelectedIndicator(null)} />
      </div>
    </div>
  )
}

export default DashboardIndicators