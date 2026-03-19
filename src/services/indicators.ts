import { apiGet } from './api';
import type { Indicator, PaginatedResponse, IndicatorFilters } from '@/types/indicator';

function buildQueryString(filters: IndicatorFilters): string {
  const params = new URLSearchParams();
  if (filters.page) params.set('page', String(filters.page));
  if (filters.limit) params.set('limit', String(filters.limit));
  if (filters.severity) params.set('severity', filters.severity);
  if (filters.type) params.set('type', filters.type);
  if (filters.search) params.set('search', filters.search);
  if (filters.sortKey) params.set('sortKey', filters.sortKey);
  if (filters.sortOrder) params.set('sortOrder', filters.sortOrder);
  const qs = params.toString();
  return qs ? `?${qs}` : '';
}

export async function fetchIndicators(
  filters: IndicatorFilters
): Promise<PaginatedResponse<Indicator>> {
  return apiGet<PaginatedResponse<Indicator>>(`/indicators${buildQueryString(filters)}`);
}

export async function fetchIndicator(id: string): Promise<Indicator> {
  return apiGet<Indicator>(`/indicators/${id}`);
}
