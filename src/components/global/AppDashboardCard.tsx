import React, { useMemo } from 'react'

export type AppCardVariant = 'neutral' | 'critical' | 'high' | 'medium' | 'low'

type Props = {
    variant: AppCardVariant
    title: string
    icon: React.ReactNode
    description: string
    value: number
}

const AppCard = (props: Props) => {
    const { variant, title, description, icon, value } = props

    /**
     * Generate the value classes based on the variant prop
     * 
     * @returns The value classes
     */
    const valueClass = useMemo((): string => {
        switch (variant) {
            case 'neutral':
            default:
                return 'text-(--text-primary)'
            case 'critical':
                return 'text-(--severity-critical)'
            case 'high':
                return 'text-(--severity-high)'
            case 'medium':
                return 'text-(--severity-medium)'
            case 'low':
                return 'text-(--severity-low)'
        }
    }, [variant])

    return (
        <div className="flex flex-col gap-(--sp-1) rounded-lg px-(--sp-5) py-(--sp-4) bg-(--bg-card) transition-border-color duration-200 ease-in-out hover:border-(--border-hover)">
            <div className="flex items-center justify-between gap-(--sp-2)">
            <span className="text-[10.5px] uppercase font-semibold tracking-widest text-(--text-tertiary)">{title}</span>
                {icon && <div className="flex items-center justify-center w-4 h-4 text-(--text-tertiary)">{icon}</div>}
            </div>
            <div className="flex items-center justify-between">
                <span className={`text-[26px] font-bold tracking-tight leading-tight ${valueClass}`}>{value}</span>
            </div>
            <div className="text-[11px] text-(--text-tertiary)">
                {description}
            </div>
        </div>
    )
}

export default AppCard