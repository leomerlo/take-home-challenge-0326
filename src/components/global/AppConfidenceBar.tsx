import React, { useMemo } from 'react'

export type AppConfidenceBarVariant = 'critical' | 'high' | 'medium' | 'low'

type Props = {
    confidence: number
    variant: AppConfidenceBarVariant
}

const AppConfidenceBar = (props: Props) => {
    const { confidence, variant } = props

    /**
     * Generate the variant classes based on the variant prop
     * 
     * @returns The variant classes
     */
    const fillClass = useMemo((): string => {
        switch (variant) {
            case 'critical':
            default:
                return 'bg-[var(--severity-critical)]'
            case 'high':
                return 'bg-[var(--severity-high)]'
            case 'medium':
                return 'bg-[var(--severity-medium)]'
            case 'low':
                return 'bg-[var(--severity-low)]'
        }
    }, [variant])

    const textClass = useMemo((): string => {
        switch (variant) {
            case 'critical':
            default:
                return 'text-[var(--severity-critical)]'
            case 'high':
                return 'text-[var(--severity-high)]'
            case 'medium':
                return 'text-[var(--severity-medium)]'
            case 'low':
                return 'text-[var(--severity-low)]'
        }
    }, [variant])

    return (
        <div className="flex gap-2 items-center">
            <div className={`w-full h-2 rounded-sm bg-(--bg-elevated)`}>
                <div className={`h-full rounded-sm ${fillClass}`} style={{ width: `${confidence}%` }} aria-valuenow={confidence} aria-valuemin={0} aria-valuemax={100} role="progressbar"></div>
            </div>
            <span className={`text-[11px] font-bold ${textClass}`}>{confidence}</span>
        </div>
    )
}

export default AppConfidenceBar