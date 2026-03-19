const SORTABLE_FIELDS = ['value', 'type', 'severity', 'source', 'firstSeen', 'lastSeen', 'confidence', 'reports', 'auguredOn'];

const SEVERITY_ORDER = { critical: 4, high: 3, medium: 2, low: 1 };

export function sortIndicators(indicators, sortKey, sortOrder) {
  if (!sortKey || !sortOrder || !SORTABLE_FIELDS.includes(sortKey)) {
    return indicators;
  }

  const dir = sortOrder === 'asc' ? 1 : -1;

  return [...indicators].sort((a, b) => {
    let cmp = 0;

    switch (sortKey) {
      case 'value':
      case 'type':
      case 'source':
        cmp = (a[sortKey] ?? '').localeCompare(b[sortKey] ?? '', undefined, { numeric: true });
        break;

      case 'severity':
        cmp = (SEVERITY_ORDER[a.severity] ?? 0) - (SEVERITY_ORDER[b.severity] ?? 0);
        break;

      case 'firstSeen':
      case 'lastSeen':
      case 'auguredOn':
        cmp = new Date(a[sortKey]) - new Date(b[sortKey]);
        break;

      case 'confidence':
      case 'reports':
        cmp = (a[sortKey] ?? 0) - (b[sortKey] ?? 0);
        break;

      default:
        return 0;
    }

    return dir * cmp;
  });
}