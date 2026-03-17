import { useQuery } from '@tanstack/react-query';
import type { Stats } from '@/types/stats';

async function fetchStats(): Promise<Stats> {
  const res = await fetch('/api/stats');
  if (!res.ok) throw new Error('Failed to fetch stats');
  return res.json();
}

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
