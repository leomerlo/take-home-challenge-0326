import i18n from 'i18next';

const UNITS: { unit: Intl.RelativeTimeFormatUnit; ms: number }[] = [
  { unit: 'year', ms: 365 * 24 * 60 * 60 * 1000 },
  { unit: 'month', ms: 30 * 24 * 60 * 60 * 1000 },
  { unit: 'week', ms: 7 * 24 * 60 * 60 * 1000 },
  { unit: 'day', ms: 24 * 60 * 60 * 1000 },
  { unit: 'hour', ms: 60 * 60 * 1000 },
  { unit: 'minute', ms: 60 * 1000 },
  { unit: 'second', ms: 1000 },
];

export function formatTimeAgo(date: Date | string | number, locale = i18n.language): string {
  const diff = Date.now() - (typeof date === 'number' ? date : new Date(date).getTime());
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'always' });

  for (const { unit, ms } of UNITS) {
    const value = Math.floor(Math.abs(diff) / ms);
    if (value >= 1) return rtf.format(-value, unit);
  }
  return rtf.format(0, 'second');
}

export function formatDateUTC(date: Date | string | number): string {
  const d = typeof date === 'number' ? new Date(date) : new Date(date);
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, '0');
  const day = String(d.getUTCDate()).padStart(2, '0');
  const h = String(d.getUTCHours()).padStart(2, '0');
  const min = String(d.getUTCMinutes()).padStart(2, '0');
  return `${y}-${m}-${day} ${h}:${min} UTC`;
}

export function formatDate(date: Date | string | number): string {
  const d = typeof date === 'number' ? new Date(date) : new Date(date);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}