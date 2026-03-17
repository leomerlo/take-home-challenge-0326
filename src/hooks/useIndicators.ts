import { useQuery } from '@tanstack/react-query';
import type { Indicator, PaginatedResponse, IndicatorFilters } from '@/types/indicator';

function buildQueryString(filters: IndicatorFilters): string {
  const params = new URLSearchParams();
  if (filters.page) params.set('page', String(filters.page));
  if (filters.limit) params.set('limit', String(filters.limit));
  if (filters.severity) params.set('severity', filters.severity);
  if (filters.type) params.set('type', filters.type);
  if (filters.search) params.set('search', filters.search);
  const qs = params.toString();
  return qs ? `?${qs}` : '';
}

async function fetchIndicators(
  filters: IndicatorFilters
): Promise<PaginatedResponse<Indicator>> {
  const url = `/api/indicators${buildQueryString(filters)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch indicators');
  return res.json();
}

export function useIndicators(filters: IndicatorFilters = {}) {
  const query = useQuery({
    queryKey: ['indicators', filters],
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
