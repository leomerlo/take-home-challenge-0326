import { useDebouncedCallback } from '@/hooks/useDebouncedCallback';
import { IndicatorFilters, IndicatorType, Severity } from '@/types/indicator';
import { SearchIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import AppSelect from '@/components/global/AppSelect';
import AppInput from '@/components/global/AppInput';
import AppButton from '../global/AppButton';

type Props = {
  filters: IndicatorFilters;
  setFilters: React.Dispatch<React.SetStateAction<IndicatorFilters>>;
}

const IndicatorsDataFilters = (props: Props) => {
  const { filters, setFilters } = props;
  const { t } = useTranslation();
  const [searchValue, setSearchValue] = useState(filters.search);

  useEffect(() => {
    setSearchValue(filters.search);
  }, [filters.search]);

  const debouncedSetSearch = useDebouncedCallback((value: string) => {
    setFilters((prev) => ({ ...prev, search: value, page: 1 }));
  }, 300);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    debouncedSetSearch(value);
  };

  return (
    <div className="flex items-center justify-between">
      <form className="flex gap-(--sp-3) items-center">
        <AppInput
          label={t('indicators.filters.search')}
          icon={<SearchIcon className="w-4 h-4 text-(--text-tertiary)" aria-hidden="true" />}
          value={searchValue}
          onChange={handleSearchChange}
          placeholder={t('indicators.filters.search')}
          containerClassName="w-[260px]"
        />
        <div className="border-r border-(--border-default) h-6"></div>
        <AppSelect<Severity | ''>
          label={t('indicators.filters.severity.label')}
          value={filters.severity ?? ''}
          onChange={(value) => setFilters({ ...filters, severity: value as Severity })}
          options={[
            { label: t('indicators.filters.severity.all'), value: '' },
            { label: t('indicators.filters.severity.critical'), value: 'critical' },
            { label: t('indicators.filters.severity.high'), value: 'high' },
            { label: t('indicators.filters.severity.medium'), value: 'medium' },
            { label: t('indicators.filters.severity.low'), value: 'low' },
          ]}
        />
        <AppSelect<IndicatorType | ''>
          label={t('indicators.filters.type.label')}
          value={filters.type ?? ''}
          onChange={(value) => setFilters({ ...filters, type: value as IndicatorType })}
          options={[
            { label: t('indicators.filters.type.all'), value: '' },
            { label: t('indicators.filters.type.ip'), value: 'ip' },
            { label: t('indicators.filters.type.domain'), value: 'domain' },
            { label: t('indicators.filters.type.hash'), value: 'hash' },
            { label: t('indicators.filters.type.url'), value: 'url' },
          ]}
        />
        <AppSelect
          label={t('indicators.filters.source.label')}
          value={''}
          onChange={() => false}
          options={[
            { label: t('indicators.filters.source.all'), value: '' },
          ]}
        />
      </form>
      <AppButton
        variant="ghost"
        onClick={() => setFilters((prev) => ({
          ...prev,
          search: '',
          severity: undefined,
          type: undefined,
          page: 1,
        }))}
      >
        {t('indicators.filters.clear')}
      </AppButton>
    </div>
  )
}

export default IndicatorsDataFilters