import React, { useMemo, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ChartNoAxesColumn, File, Globe, Layers, LayoutGrid, Menu, Search, Shield, Users, X } from 'lucide-react'
import { useFocusTrap } from '@/hooks/useFocusTrap'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import '@/styles/sidebar.css'

type SidebarItem = {
    label: string
    icon: React.ReactNode
    href: string,
    notification?: number
}

type SidebarGroup = {
    label?: string
    items: SidebarItem[]
}

const SIDEBAR_ITEMS: SidebarGroup[] = [
    {
        items: [
            {
                label: 'dashboard',
                icon: <LayoutGrid size={18} />,
                href: '/',
                notification: 3,
            },
            {
                label: 'augur-events',
                icon: <Layers size={18} />,
                href: '/augur-events',
            },
            {
                label: 'investigate',
                icon: <Search size={18} />,
                href: '/investigate',
            }
        ]
    },
    {
        label: 'intelligence',
        items: [
            {
                label: 'threat-indicators',
                icon: <Shield size={18} />,
                href: '/threat-indicators',
            },
            {
                label: 'campaigns',
                icon: <Globe size={18} />,
                href: '/campaigns',
            },
            {
                label: 'actors',
                icon: <Users size={18} />,
                href: '/actors',
            }
        ]
    },
    {
        label: 'reports',
        items: [
            {
                label: 'executive-reports',
                icon: <File size={18} />,
                href: '/executive-reports',
            },
            {
                label: 'analytics',
                icon: <ChartNoAxesColumn size={18} />,
                href: '/analytics',
            }
        ]
    },
    {
        label: 'settings',
        items: [
            {
                label: 'integrations',
                icon: <Menu size={18} />,
                href: '/integrations',
            }
        ]
    }
]

const TheSidebar = () => {
    const { t, i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const isMobile = useMediaQuery();
    const asideRef = useRef<HTMLElement>(null);
    const closeButtonRef = useRef<HTMLButtonElement>(null);
    const openButtonRef = useRef<HTMLButtonElement>(null);

    useFocusTrap(asideRef, isOpen && isMobile, {
        initialFocusRef: closeButtonRef,
        returnFocusRef: openButtonRef,
    });

    const sidebarItems = useMemo(() => {
        return SIDEBAR_ITEMS.map((group, groupIndex) => (
            <div key={groupIndex} data-testid={`sidebar-group-${group.label ? group.label : 'default'}`} className="flex flex-col gap-[2px]">
                {group.label && (
                    <div className="text-(--text-tertiary) uppercase lg:text-[10px] tracking-[1.2px] px-(--sp-5) pt-(--sp-3) pb-(--sp-2) font-semibold">{t(`navigation.${group.label}`)}</div>
                )}
                {group.items.map((item) => (
                    <NavLink
                        key={item.href}
                        to={item.href}
                        data-testid={`sidebar-item-${item.label}`}
                        className={({ isActive }) => `nav-item flex items-center gap-(--sp-3) rounded-md px-(--sp-5) py-(--sp-4) lg:py-(--sp-2) mx-(--sp-2) my-(1px) lg:text-[13px] transition-all duration-150 ease hover:bg-(--bg-card) hover:text-(--text-primary) ${isActive ? 'bg-(--bg-sidebar-active) text-(--augur-blue)' : 'text-(--text-secondary)'}`}
                        end
                    >
                        <div className="nav-icon opacity-60">{item.icon}</div>
                        <span className="leading-none flex-1">{t(`navigation.${item.label}`)}</span>
                        {item.notification && (
                            <span title={`${t(`navigation.notifications`, { count: item.notification })}`} className="text-white bg-(--severity-critical) rounded-full text-[10px] flex items-center justify-center min-w-[18px] px-[6px] py-px">{item.notification}</span>
                        )}
                    </NavLink>
                ))}
            </div>
        ))
    }, [t, i18n.language])

    return (
        <>
            <button
                ref={openButtonRef}
                onClick={() => setIsOpen(true)}
                className="lg:hidden absolute top-2 right-2 p-(--sp-3) rounded-md hover:bg-(--bg-card) hover:text-(--text-primary) cursor-pointer"
                data-testid="sidebar-toggle-open"
            >
                <Menu size={20} className="text-white" aria-label={t('navigation.open')} />
            </button>
            <aside
                ref={asideRef}
                aria-hidden={!isOpen}
                {...(isOpen && isMobile && { 'aria-modal': true, role: 'dialog', 'aria-label': t('navigation.menu') })}
                className={`
                    flex flex-col bg-(--bg-sidebar) border-r border-(--border-subtle) py-(--sp-5) overflow-y-auto
                    lg:static lg:block lg:w-(--sidebar-width) lg:shrink-0 lg:h-screen
                    fixed inset-0 z-50 w-full h-full
                    transition-transform duration-200 ease-out
                    ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                `}
                >
                <button
                    ref={closeButtonRef}
                    onClick={() => setIsOpen(false)}
                    className="lg:hidden absolute top-2 right-2 p-(--sp-3) rounded-md hover:bg-(--bg-card) hover:text-(--text-primary) cursor-pointer"
                    data-testid="sidebar-toggle-close"
                    aria-label={t('navigation.close')}
                >
                    <X size={20} className="text-white" />
                </button>
                <nav className="flex-col gap-(--sp-2) flex border-r border-(--border-subtle)">
                    <div className="flex items-center gap-(--sp-3) px-(--sp-5) pb-(--sp-4)">
                        <svg className="w-7 h-7" viewBox="0 0 28 28" fill="none"><path d="M14 2L2 26h24L14 2z" stroke="#fff" strokeWidth="2" fill="none"></path><path d="M14 10l-5 10h10l-5-10z" fill="#6383ff" opacity="0.3"></path></svg>
                        <span className="text-(--augur-logo) [font-family:var(--font-display)] text-[18px] tracking-[3px] leading-none uppercase font-bold">Augur</span>
                    </div>
                    {sidebarItems}
                </nav>
            </aside>
        </>
    )
}

export default TheSidebar