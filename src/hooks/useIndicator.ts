import { useQuery } from '@tanstack/react-query';
import { fetchIndicator } from '@/services/indicators';

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
