import { useIndicators } from '@/hooks/useIndicators';
import { IndicatorFilters } from '@/types/indicator';
import IndicatorsDataFilters from '@/components/dashboard/IndicatorsDataFilters';
import { useState } from 'react';

const DashboardIndicators = () => {
    const [filters, setFilters] = useState<IndicatorFilters>({
        page: 1,
        limit: 10,
        severity: undefined,
        type: undefined,
        search: '',
    });
    const { data, loading, error } = useIndicators(filters);

    return (
        <div className="px-(--sp-8) py-(--sp-4) bg-(--bg-surface) border-b border-(--border-subtle)">
            <IndicatorsDataFilters filters={filters} setFilters={setFilters} />
        </div>
    )
}

export default DashboardIndicators