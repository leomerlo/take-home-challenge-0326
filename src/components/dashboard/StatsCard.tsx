import React, { useMemo } from 'react'

export type StatsCardVariant = 'total' | 'critical' | 'high' | 'medium' | 'low'

type Props = {
    variant: StatsCardVariant
    title: string
    icon?: React.ReactNode
    loading?: boolean
    description: string | React.ReactNode
    value: number
}

const StatsCard = (props: Props) => {
    const { variant, title, description, icon, value, loading } = props

    if (loading) {
        return (
            <div className="flex flex-col gap-(--sp-1) rounded-lg px-(--sp-5) py-(--sp-4) bg-(--bg-card) border border-(--border-subtle)">
                <div className="flex items-center justify-between gap-(--sp-2)">
                    <div className="h-3 w-24 rounded skeleton" />
                    <div className="h-4 w-4 rounded skeleton" />
                </div>
                <div className="flex items-center justify-between">
                    <div className="h-8 w-16 rounded skeleton" />
                </div>
                <div className="h-3 w-full rounded skeleton" />
            </div>
        )
    }

    /**
     * Generate the value classes based on the variant prop
     * 
     * @returns The value classes
     */
    const valueClass = useMemo((): string => {
        switch (variant) {
            case 'total':
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
        <div className="flex flex-col gap-(--sp-1) rounded-lg px-(--sp-5) py-(--sp-4) bg-(--bg-card) border border-transparent hover:border-(--border-hover) transition-border-color duration-200 ease">
            <div className="flex items-center justify-between gap-(--sp-2)">
            <span className="text-2xs uppercase font-semibold tracking-widest text-(--text-tertiary)">{title}</span>
                {icon && <div className="flex items-center justify-center w-4 h-4 text-(--text-tertiary)">{icon}</div>}
            </div>
            <div className="flex items-center justify-between">
                <span className={`text-3xl font-bold tracking-tight leading-tight ${valueClass}`}>{value}</span>
            </div>
            <div className="text-xs text-(--text-tertiary)">
                {description}
            </div>
        </div>
    )
}

export default StatsCard