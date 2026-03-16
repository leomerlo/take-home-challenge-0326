import React, { useMemo } from 'react'

export type AppButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'
export type AppButtonSize = 'small' | 'medium'

type Props = {
    children: React.ReactNode
    onClick: () => void
    disabled?: boolean
    variant?: AppButtonVariant
    size?: AppButtonSize
    className?: string
}

const AppButton = (props: Props) => {
    const { children, onClick, disabled, variant = 'primary', size = 'medium', className = '' } = props

    /**
     * Generate the variant classes based on the variant prop
     * 
     * @returns The variant classes
     */
    const variantClass = useMemo((): string => {
        switch (variant) {
            case 'primary':
            default:
                return 'bg-[var(--augur-blue)] text-white border-1 border-[var(--augur-blue)]'

            case 'secondary':
                return 'bg-transparent text-[var(--text-primary)] border-1 border-[var(--border-default)]'

            case 'ghost':
                return 'bg-transparent text-[var(--text-secondary)] px-[10px]! py-[6px]! border-none!'

            case 'danger':
                return 'bg-[var(--severity-critical-bg)] text-[var(--severity-critical)] border-1 border-[var(--severity-critical-border)]'
        }
    }, [variant])
    
    /**
     * Generate the size classes based on the size prop
     * 
     * @returns The size classes
     */
    const sizeClass = useMemo((): string => {
        switch (size) {
            case 'small':
                return 'text-[11.5px] px-[10px]! py-[4px]!'
            case 'medium':
                return 'text-[12.5px]'
        }
    }, [size])

    return (
        <button
            className={`inline-flex items-center justify-center gap-2 px-[14px] py-[7px] rounded-md border hover:filter-brightness-110 font-sans text-md cursor-pointer whitespace-nowrap leading-tight ${variantClass} ${sizeClass} ${className}`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
  )
}

export default AppButton