import { apiGet } from './api';
import type { Stats } from '@/types/stats';

export async function fetchStats(): Promise<Stats> {
  return apiGet<Stats>('/stats');
}
