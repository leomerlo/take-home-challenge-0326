import { useQuery } from '@tanstack/react-query';
import { fetchStats } from '@/services/stats';

export function useStats() {
  const query = useQuery({
    queryKey: ['stats'],
    queryFn: fetchStats,
  });
  return {
    data: query.data ?? null,
    loading: query.isLoading,
    error: query.error instanceof Error ? query.error : null,
    refetch: query.refetch,
    isFetching: query.isFetching,
  };
}
