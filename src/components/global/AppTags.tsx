import React, { useMemo } from 'react'

export type AppTagsVariant = 'red' | 'blue' | 'purple' | 'teal' | 'gray'

type Props = {
    variant: AppTagsVariant
    children: React.ReactNode
}

const AppTags = (props: Props) => {
    const { variant = 'red', children } = props

    /**
     * Generate the variant classes based on the variant prop
     * 
     * @returns The variant classes
     */
    const variantClass = useMemo((): string => {
        switch (variant) {
            case 'red':
            default:
                return 'bg-[var(--tag-red)] text-[var(--tag-red-text)] border-[var(--tag-red-border)]'
            case 'blue':
                return 'bg-[var(--tag-blue)] text-[var(--tag-blue-text)] border-[var(--tag-blue-border)]'
            case 'purple':
                return 'bg-[var(--tag-purple)] text-[var(--tag-purple-text)] border-[var(--tag-purple-border)]'
            case 'teal':
                return 'bg-[var(--tag-teal)] text-[var(--tag-teal-text)] border-[var(--tag-teal-border)]'
            case 'gray':
                return 'bg-[var(--tag-gray)] text-[var(--tag-gray-text)] border-[var(--tag-gray-border)]'
        }
    }, [variant])
    
    return (
        <div className={`inline-flex items-center justify-center gap-4 px-2 py-[2px] rounded-sm border text-xs cursor-pointer whitespace-nowrap leading-tight ${variantClass}`}>
            {children}
        </div>
    )
}

export default AppTags