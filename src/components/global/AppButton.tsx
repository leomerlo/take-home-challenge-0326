import React, { useMemo } from 'react'

export type AppButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'
export type AppButtonSize = 'small' | 'medium'
export type AppButtonIconPosition = 'left' | 'right'

const AppButton = (props: {
    children: React.ReactNode
    onClick: () => void
    disabled?: boolean
    variant?: AppButtonVariant
    size?: AppButtonSize
    className?: string
    iconPosition?: AppButtonIconPosition
    icon?: React.ReactNode
}) => {
    const { children, onClick, disabled, variant = 'primary', size = 'medium', className = '', iconPosition = 'left', icon } = props

    /**
     * Generate the variant classes based on the variant prop
     * 
     * @returns The variant classes
     */
    const variantClass = useMemo((): string => {
        switch (variant) {
            case 'primary':
            default:
                return 'bg-[var(--augur-blue)] text-white border-1 border-[var(--augur-blue)] hover:brightness-[1.15]'

            case 'secondary':
                return 'bg-transparent text-[var(--text-primary)] border-1 border-[var(--border-default)] hover:bg-(--bg-card) hover:border-(--border-hover)'

            case 'ghost':
                return 'bg-transparent text-[var(--text-secondary)] px-[10px]! py-[6px]! border-none! hover:bg-(--bg-card) hover:text-(--text-primary)'

            case 'danger':
                return 'bg-[var(--severity-critical-bg)] text-[var(--severity-critical)] border-1 border-[var(--severity-critical-border)] hover:brightness-[1.5]'
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
            className={`inline-flex items-center justify-center gap-2 px-[14px] py-[7px] rounded-md border font-sans text-md cursor-pointer whitespace-nowrap leading-tight ${variantClass} ${sizeClass} ${className}`}
            onClick={onClick}
            disabled={disabled}
        >
            {icon && iconPosition === 'left' && <div className="flex items-center justify-center w-4 h-4">{icon}</div>}
            {children}
            {icon && iconPosition === 'right' && <div className="flex items-center justify-center w-4 h-4">{icon}</div>}
        </button>
  )
}

export default AppButton