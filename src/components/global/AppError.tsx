import AppButton from '@/components/global/AppButton'
import { AlertCircle, RefreshCcw } from 'lucide-react'
import { useTranslation } from 'react-i18next'

type Props = {
    message: string
    onRetry: () => void
}

const AppError = (props: Props) => {
    const { message } = props
    const { t } = useTranslation()
  return (
    <>
        <AlertCircle size={48} className="text-(--severity-critical) opacity-30 mb-(--sp-4)" />
        <p className="text-center text-(--text-secondary) text-[13px] mb-(--sp-2)">
            {t('global.error')}
        </p>
        <p className="text-center text-(--text-tertiary) text-[11px] mb-(--sp-4)">
            {message}
        </p>
        <AppButton
            onClick={() => false }
            variant="secondary"
            iconPosition="left"
            icon={<RefreshCcw size={16} />}
        >
            {t('global.retry')}
        </AppButton>
    </>
  )
}

export default AppError