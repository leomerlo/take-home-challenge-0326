import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import AppButton from '../../global/AppButton';
import AppBadge, { AppBadgeSeverity } from '../../global/AppBadge';
import AppConfidenceBar, { AppConfidenceBarVariant } from '../../global/AppConfidenceBar';
import AppTags from '../../global/AppTags';
import { TAG_VARIANTS, TYPE_ICONS } from '@/helpers/indicatorHelpers';
import { formatDate, formatDateUTC, formatTimeAgo } from '@/helpers/dateHelpers';
import { useIndicator } from '@/hooks/useIndicator';
import { Link } from 'react-router-dom';
import IndicatorDetailsSkeleton from '@/components/dashboard/indicators/IndicatorDetailsSkeleton';
import AppError from '../../global/AppError';

type Props = {
  indicatorId: string | null;
  onClose: () => void;
}

const IndicatorDetails = (props: Props) => {
  const { indicatorId, onClose } = props;
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMediaQuery();
  const { data, loading, error } = useIndicator(indicatorId ?? '');
  const { t } = useTranslation();

  useEffect(() => {
    if (data) setIsOpen(true);
  }, [data]);

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      onClose();
    }, 200);
  }

  if (loading) {
    return <IndicatorDetailsSkeleton />;
  }

  return (
    <>
      <aside
        className={`
          z-60 ease-out shadow-(--shadow-elevated) duration-200 h-full
          ${isMobile 
            ? `fixed inset-0 w-full transition-transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`
            : `overflow-hidden shrink-0 transition-[width] relative ${isOpen ? 'w-(--detail-width)' : 'w-0'}`
          }
        `}
        aria-hidden={!isOpen && isMobile ? true : undefined}
        aria-label={t('indicators.details.title')}
        tabIndex={!isOpen && isMobile ? -1 : undefined}
      >
        <div className={`absolute top-0 left-0 border-l border-(--border-subtle) bg-(--bg-surface) h-full w-full lg:w-(--detail-width)`}>
          <div className="flex flex-col w-full h-full">
            <div className="sticky py-(--sp-4) px-(--sp-5) border-b border-(--border-subtle) flex justify-between items-center">
              <h1 className="text-sm font-semibold text-white">{t('indicators.details.title')}</h1>
              <AppButton
                variant="ghost"
                onClick={handleClose}
                aria-label={t('global.close')}
              >
                <X size={16} />
              </AppButton>
            </div>
            {!data || error ? (
              <div className="flex items-center justify-center flex-1">
                <AppError message={t('indicators.details.error')} onRetry={() => false } />
              </div>
            ) : data ? (
            <div className="flex-1 flex flex-col gap-(--sp-6) p-(--sp-5) pb-(--sp-6) overflow-y-auto">
              <div className="detail-section">
                <span className="detail-section-header">{t('indicators.details.label.value')}</span>
                <span className="text-sm text-(--augur-blue) font-mono break-all">{data.value}</span>
              </div>
              <div className="detail-section">
                <span className="detail-section-header">{t('indicators.details.label.classification')}</span>
                <div className="flex items-center gap-(--sp-2)">
                  <AppBadge severity={data.severity as AppBadgeSeverity}>{t(`indicators.table.severity.${data.severity}`)}</AppBadge>
                  <span className="text-xs text-(--text-secondary) uppercase">{TYPE_ICONS[data.type] ?? '•'} {t(`indicators.table.type.${data.type}`)}</span>
                </div>
              </div>
              <div className="detail-section">
                <span className="detail-section-header">{t('indicators.details.label.confidence')}</span>
                <div className="w-[120px]">
                  <AppConfidenceBar confidence={data.confidence ?? 0} variant={data.severity as AppConfidenceBarVariant} />
                </div>
              </div>
              <div className="detail-section">
                <span className="detail-section-header">{t('indicators.details.label.tags')}</span>
                <div className="flex items-center flex-wrap gap-(--sp-2)">
                  {data.tags.map((tag) => (
                    <AppTags key={tag} variant={TAG_VARIANTS[tag] ?? 'gray'}>{tag}</AppTags>
                  ))}
                </div>
              </div>
              <div className="detail-section">
                <span className="detail-section-header">{t('indicators.details.label.timeline')}</span>
                <div className="flex flex-col">
                  <div className="detail-row">
                    <span className="detail-row-label">{t('indicators.details.label.firstSeen')}</span>
                    <span className="detail-row-value">{formatDateUTC(data.firstSeen ?? '')}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-row-label">{t('indicators.details.label.lastSeen')}</span>
                    <span className="detail-row-value">{formatTimeAgo(data.lastSeen ?? '')}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-row-label">{t('indicators.details.label.auguredOn')}</span>
                    <span className="detail-row-value text-(--augur-blue)!">{formatDate(data.auguredOn ?? '')}</span>
                  </div>
                </div>
              </div>
              <div className="detail-section">
                <span className="detail-section-header">{t('indicators.details.label.source')}</span>
                <div className="detail-row">
                  <span className="detail-row-label">{t('indicators.details.label.provider')}</span>
                  <span className="detail-row-value">{data.source}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-row-label">{t('indicators.details.label.reports')}</span>
                  <span className="detail-row-value">{data.reports}</span>
                </div>
              </div>
              <div className="detail-section">
                <span className="detail-section-header">{t('indicators.details.label.relatedCampaigns')}</span>
                <div className="flex flex-col gap-(--sp-2)">
                  {data.relatedCampaigns.map((campaign) => (
                    <div key={campaign.name} className="flex items-center gap-(--sp-2)">
                      <Link to={`/campaigns/${campaign.name}`} className="text-xs text-(--augur-blue)! truncate">{campaign.name}</Link>
                      <span className="text-xs text-(--text-tertiary)">{campaign.actor}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="detail-section">
                <div className="flex gap-(--sp-2)">
                  <AppButton className="flex-1 justify-start" variant="secondary" size="small" onClick={handleClose}>{t('indicators.details.button.investigate')}</AppButton>
                  <AppButton className="flex-1 justify-start" variant="danger" size="small" onClick={handleClose}>{t('indicators.details.button.block')}</AppButton>
                </div>
              </div>
            </div>
            ) : null}
          </div>
        </div>
      </aside>
    </>
  )
}

export default IndicatorDetails