import StatsCard from '@/components/dashboard/StatsCard';
import { ArrowUp, Shield } from 'lucide-react';
import { useStats } from '@/hooks/useStats';
import { useTranslation } from 'react-i18next';
import AppError from '@/components/global/AppError';

const DashboardStats = () => {
    const { data, loading, error } = useStats();
    const { t } = useTranslation();

  if (loading) {
    return (
      <div className="grid grid-cols-5 gap-(--sp-4)">
        {Array.from({ length: 5 }).map((_, i) => (
          <StatsCard key={i} variant="total" title="" description="" value={0} loading={true} />
        ))}
      </div>
    )
  }

  if (error) {
    return (
        <div className="w-full pt-(--sp-4)">
          <AppError message={t('dashboard.stats.error')} onRetry={() => false } />
        </div>
      );
  }

  if (!loading && !error && data?.total === 0) {
    return (
      <div className="grid grid-cols-5 gap-(--sp-4)">
        <div className="col-span-5 flex flex-col items-center justify-center py-(--sp-12) px-(--sp-8) rounded-lg bg-(--bg-card) border border-(--border-subtle)">
          <p className="text-(--text-secondary) text-xs">{t('dashboard.stats.empty')}</p>
        </div>
      </div>
    )
  }

  return (
    <>
        <div className="grid grid-rows-5 lg:grid-rows-1 lg:grid-cols-5 gap-(--sp-4)">
            <StatsCard
                variant="total"
                title={t(`dashboard.stats.total_indicators`)}
                icon={<Shield size={24} />}
                description={
                    <div className="flex items-center gap-1 text-xs text-(--text-tertiary)">
                        <ArrowUp size={12} />
                        {t(`dashboard.stats.total_indicators_description`, { percentage: 12 })}
                    </div>
                }
                value={data?.total ?? 0}
            />
            <StatsCard variant="critical" title={t(`dashboard.stats.critical`)} description={t(`dashboard.stats.critical_description`)} value={data?.critical ?? 0} />
            <StatsCard variant="high" title={t(`dashboard.stats.high`)} description={t(`dashboard.stats.high_description`)} value={data?.high ?? 0} />
            <StatsCard variant="medium" title={t(`dashboard.stats.medium`)} description={t(`dashboard.stats.medium_description`)} value={data?.medium ?? 0} />
            <StatsCard variant="low" title={t(`dashboard.stats.low`)} description={t(`dashboard.stats.low_description`)} value={data?.low ?? 0} />
        </div>
    </>
  )
}

export default DashboardStats