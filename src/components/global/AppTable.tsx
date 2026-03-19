import React, { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export type TableHeading<T = object> = {
  key: keyof T | string
  label: string
  sortable?: boolean
  width?: string | number // "100px", "20%", "minmax(100px, 1fr)"
}

export type AppTableProps<T extends object> = {
  headings: TableHeading<T>[]
  data: T[]
  rowKey: keyof T | string | ((row: T) => string)
  selectable?: boolean
  selectedRowKeys?: string[]
  onSelectionChange?: (selectedKeys: string[], selectedRows: T[]) => void
  onSortChange?: (sortKey: string, sortOrder: 'asc' | 'desc') => void
  sortKey?: string
  sortOrder?: 'asc' | 'desc'
  headingSlots?: Partial<Record<string, React.ReactNode>>
  cellSlots?: Partial<Record<string, (row: T, index: number) => React.ReactNode>>
  onRowClick?: (row: T, index: number) => void
  className?: string
  ariaLabelSelectAll?: string
  ariaLabelSelectRow?: (index: number) => string
}

const AppTable = <T extends object>(props: AppTableProps<T>) => {
  const { t } = useTranslation()
  const {
    headings,
    data,
    rowKey,
    selectable = false,
    selectedRowKeys: controlledSelectedKeys,
    sortKey,
    sortOrder,
    onSelectionChange,
    onSortChange,
    headingSlots = {},
    cellSlots = {},
    onRowClick,
    className = '',
    ariaLabelSelectAll = t('global.select_all'),
    ariaLabelSelectRow = (index: number) => t('global.select_row', { index: index + 1 }),
  } = props
  
  const [internalSelected, setInternalSelected] = useState<Set<string>>(new Set())
  
  const isControlled = controlledSelectedKeys !== undefined
  const selectedKeys = isControlled
  ? new Set(controlledSelectedKeys)
  : internalSelected
  
  const getRowId = useCallback(
    (row: T): string => {
      if (typeof rowKey === 'function') {
        return rowKey(row)
      }
      const value = row[rowKey as keyof T]
      return String(value ?? '')
    },
    [rowKey]
  )
  
  const toggleRowSelection = useCallback(
    (id: string) => {
      const next = new Set(selectedKeys)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      if (!isControlled) setInternalSelected(next)
        const selectedRows = data.filter((r) => next.has(getRowId(r)))
      onSelectionChange?.(Array.from(next), selectedRows)
    },
    [selectedKeys, isControlled, data, getRowId, onSelectionChange]
  )
  
  const toggleAllSelection = useCallback(() => {
    const allIds = data.map(getRowId)
    const allSelected = allIds.every((id) => selectedKeys.has(id))
    const next = allSelected ? new Set<string>() : new Set(allIds)
    if (!isControlled) setInternalSelected(next)
      const selectedRows = data.filter((r) => next.has(getRowId(r)))
    onSelectionChange?.(Array.from(next), selectedRows)
  }, [data, getRowId, selectedKeys, isControlled, onSelectionChange])
  
  const handleRowClick = useCallback(
    (row: T, index: number) => {
      if (onRowClick) onRowClick(row, index)
      },
    [onRowClick]
  )
  
  const allSelected =
  data.length > 0 && data.every((r) => selectedKeys.has(getRowId(r)))
  const someSelected = data.some((r) => selectedKeys.has(getRowId(r)))
  
  const selectAllRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    const el = selectAllRef.current
    if (el) el.indeterminate = someSelected && !allSelected
  }, [someSelected, allSelected])
  
  return (
    <div
      className={`overflow-x-auto rounded-lg ${className}`}
    >
      <table className="w-full border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-(--border-subtle) bg-(--bg-elevated)">
          {selectable && (
            <th className="w-10 px-(--sp-4) py-(--sp-3)" scope="col">
              <label className="flex cursor-pointer items-center justify-center">
              <input
                ref={selectAllRef}
                type="checkbox"
                checked={allSelected}
                onChange={toggleAllSelection}
                aria-label={ariaLabelSelectAll}
                className="h-4 w-4 rounded border-(--border-default) bg-(--bg-input) text-(--augur-blue) focus:ring-(--augur-blue) focus:ring-offset-0"
              />
              </label>
            </th>
          )}
          {headings.map((h) => {
            const key = String(h.key)
            const customHeading = headingSlots[key]
            const isActive = sortKey === key
            
            const ariaSort: 'ascending' | 'descending' | 'none' | undefined = h.sortable
              ? isActive
                ? sortOrder === 'asc'
                  ? 'ascending'
                  : 'descending'
                : 'none'
              : undefined

            return (
              <th
                key={key}
                scope="col"
                {...(ariaSort && { 'aria-sort': ariaSort })}
                className={`px-(--sp-4) py-(--sp-3) font-semibold text-(--text-tertiary) uppercase text-2xs tracking-[.8px] ${
                  h.sortable ? 'cursor-pointer select-none hover:text-(--text-primary)' : ''
                }`}
                style={h.width != null ? { width: typeof h.width === 'number' ? `${h.width}px` : h.width } : undefined}
                onClick={() => h.sortable && onSortChange?.(key, sortOrder === 'asc' ? 'desc' : 'asc')}
              >
                <div className="flex items-center gap-(--sp-1)">
                {customHeading ?? (
                  <>
                  <span>{h.label}</span>
                  {h.sortable && (
                    <span className="text-(--text-tertiary)">
                    {isActive && sortOrder === 'asc' && (
                      <ChevronUp className="h-4 w-4" />
                    )}
                    {isActive && sortOrder === 'desc' && (
                      <ChevronDown className="h-4 w-4" />
                    )}
                    {!isActive && (
                      <ChevronDown className="h-4 w-4 opacity-40" />
                    )}
                    </span>
                  )}
                  </>
                )}
                </div>
              </th>
            )
          })}
          </tr>
        </thead>
        <tbody className="text-sm text-(--text-secondary)">
        {data.map((row, index) => {
          const id = getRowId(row)
          const isSelected = selectedKeys.has(id)
          const isClickable = !!onRowClick
          
          const handleRowKeyDown = (e: React.KeyboardEvent) => {
            if (e.target instanceof HTMLInputElement && e.target.type === 'checkbox') return
            if (isClickable && (e.key === 'Enter' || e.key === ' ')) {
              e.preventDefault()
              handleRowClick(row, index)
            }
          }

          return (
            <tr
              key={id}
              role={isClickable ? 'button' : undefined}
              tabIndex={isClickable ? 0 : undefined}
              className={`border-b border-(--border-subtle) last:border-b-0 duration-150 ease transition-colors ${
                isClickable
                ? 'cursor-pointer hover:bg-(--bg-card-hover)'
                : 'hover:bg-(--bg-elevated)'
              } ${isSelected ? 'bg-(--augur-blue-dim)' : ''}`}
              onClick={() => handleRowClick(row, index)}
              onKeyDown={handleRowKeyDown}
            >
            {selectable && (
              <td
                className="w-10 px-(--sp-4) py-(--sp-3)"
                onClick={(e) => e.stopPropagation()}
              >
                <label className="flex cursor-pointer items-center justify-center">
                <input
                type="checkbox"
                checked={isSelected}
                onChange={() => toggleRowSelection(id)}
                aria-label={ariaLabelSelectRow(index)}
                className="h-4 w-4 rounded border-(--border-default) bg-(--bg-input) text-(--augur-blue) focus:ring-(--augur-blue) focus:ring-offset-0"
                />
                </label>
              </td>
            )}
            {headings.map((h) => {
              const key = String(h.key)
              const customCell = cellSlots[key]
              const value = row[key as keyof T]
              
              return (
                <td
                key={key}
                className="px-(--sp-4) py-(--sp-3)"
                style={h.width != null ? { width: typeof h.width === 'number' ? `${h.width}px` : h.width } : undefined}
                onClick={(e) => {
                  if (selectable && e.target instanceof HTMLInputElement) {
                    e.stopPropagation()
                  }
                }}
                >
                {customCell
                  ? customCell(row, index)
                  : value != null
                  ? String(value)
                  : '—'}
                  </td>
                )
              })}
              </tr>
            )
        })}
        </tbody>
      </table>
    </div>
  )
}
  
export default AppTable
  