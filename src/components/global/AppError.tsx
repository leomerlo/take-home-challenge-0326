import { AlertCircle } from 'lucide-react'
import { useTranslation } from 'react-i18next'

type Props = {
    message: string
    onRetry: () => void
}

const AppError = (props: Props) => {
    const { message } = props
    const { t } = useTranslation()
  return (
    <div className="flex flex-col items-center justify-center">
        <AlertCircle size={48} className="text-(--severity-critical) opacity-30 mb-(--sp-4)" />
        <p className="text-center text-(--text-secondary) text-[13px] mb-(--sp-2)">
            {t('global.error')}
        </p>
        <p className="text-center text-(--text-tertiary) text-[11px] mb-(--sp-4)">
            {message}
        </p>
    </div>
  )
}

export default AppError