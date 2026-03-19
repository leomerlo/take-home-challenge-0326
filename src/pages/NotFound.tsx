import { useTranslation } from "react-i18next"

const NotFound = () => {
  const { t } = useTranslation()
  return (
    <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold text-white">404</h1>
        <p className="text-gray-500">{t('not_found.description')}</p>
    </div>
  )
}

export default NotFound