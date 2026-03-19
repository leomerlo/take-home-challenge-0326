import React, { useMemo } from 'react'

export type AppBadgeSeverity = 'critical' | 'high' | 'medium' | 'low'

type Props = {
    severity: AppBadgeSeverity
    children: React.ReactNode
}

function AppBadge(props: Props) {
    const { severity, children } = props

    /**
     * Generate the variant classes based on the severity prop
     * 
     * @returns The variant classes
     */
    const variantClass = useMemo((): string => {
        switch (severity) {
            case 'critical':
            default:
                return 'bg-[var(--severity-critical-bg)] text-[var(--severity-critical)] border-[var(--severity-critical-border)]'
            case 'high':
                return 'bg-[var(--severity-high-bg)] text-[var(--severity-high)] border-[var(--severity-high-border)]'
            case 'medium':
                return 'bg-[var(--severity-medium-bg)] text-[var(--severity-medium)] border-[var(--severity-medium-border)]'
            case 'low':
                return 'bg-[var(--severity-low-bg)] text-[var(--severity-low)] border-[var(--severity-low-border)]'
        }
    }, [severity])

    return (
        <div className={`inline-flex items-center justify-center gap-4 px-2 py-[2px] rounded-sm border text-xs capitalize font-medium cursor-pointer whitespace-nowrap leading-tight ${variantClass}`}>
            {children}
        </div>
    )
}

export default AppBadge