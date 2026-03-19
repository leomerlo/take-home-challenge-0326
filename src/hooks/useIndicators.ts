import { useQuery } from '@tanstack/react-query';
import type { IndicatorFilters } from '@/types/indicator';
import { fetchIndicators } from '@/services/indicators';

export function useIndicators(filters: IndicatorFilters = {}) {
  const query = useQuery({
    queryKey: ['indicators', filters.page, filters.limit, filters.severity, filters.type, filters.search, filters.sortKey, filters.sortOrder],
    queryFn: () => fetchIndicators(filters),
  });

  const response = query.data;

  return {
    data: response?.data ?? [],
    total: response?.total ?? 0,
    page: response?.page ?? 1,
    totalPages: response?.totalPages ?? 0,
    loading: query.isLoading,
    error: query.error instanceof Error ? query.error : null,
    refetch: query.refetch,
    isFetching: query.isFetching,
  };
}
