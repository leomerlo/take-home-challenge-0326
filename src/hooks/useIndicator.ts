import { useQuery } from '@tanstack/react-query';
import { Indicator } from '@/types/indicator';

async function fetchIndicator(id: string): Promise<Indicator> {
  const res = await fetch(`/api/indicators/${id}`);
  if (!res.ok) throw new Error('Failed to fetch indicator');
  return res.json();
}

export function useIndicator(id: string) {
  const query = useQuery({
    queryKey: ['indicator', id],
    queryFn: () => fetchIndicator(id),
    enabled: !!id
  });
  
  return {
    data: query.data ?? null,
    loading: query.isLoading,
    error: query.error instanceof Error ? query.error : null,
    refetch: query.refetch,
    isFetching: query.isFetching,
  };
}
