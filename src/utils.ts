/**
 * Format today's date as YYYY-MM-DD
 */
export function todayStr(): string {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Format date for header display (e.g., "Wed, 09 Sep 2026")
 */
export function fmtDateHeader(dstr: string): string {
  const d = new Date(dstr + 'T00:00:00');
  return d.toLocaleDateString('en-IN', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

/**
 * Shift a YYYY-MM-DD date by offsetDays (e.g. -1 for yesterday, +1 for tomorrow)
 */
export function shiftDate(dstr: string, offsetDays: number): string {
  const d = new Date(dstr + 'T00:00:00');
  d.setDate(d.getDate() + offsetDays);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Format current or provided time as "08:30 AM"
 */
export function formatTimeAMPM(d: Date = new Date()): string {
  return d.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}

/**
 * Generate unique worker ID
 */
export function uid(): string {
  return 'w' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

/**
 * Escape HTML to prevent XSS in template interpolation
 */
export function escapeHtml(s?: string): string {
  if (!s) return '';
  return s.replace(/[&<>"']/g, (c) => {
    switch (c) {
      case '&':
        return '&amp;';
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case '"':
        return '&quot;';
      case "'":
        return '&#39;';
      default:
        return c;
    }
  });
}

/**
 * Group array items by a key derived from each item
 */
export function groupBy<T, K>(arr: T[], keyFn: (item: T) => K): Map<K, T[]> {
  const map = new Map<K, T[]>();
  for (const item of arr) {
    const key = keyFn(item);
    let list = map.get(key);
    if (!list) {
      list = [];
      map.set(key, list);
    }
    list.push(item);
  }
  return map;
}

/**
 * Convert headers and 2D row array to CSV string with quotes handling
 */
export function generateCsvString(headers: string[], rows: (string | number)[][]): string {
  const escapeCsvCell = (cell: string | number) => {
    const s = String(cell ?? '').replace(/"/g, '""');
    return /[",\n\r]/.test(s) ? `"${s}"` : s;
  };

  const lines = [
    headers.map(escapeCsvCell).join(','),
    ...rows.map((row) => row.map(escapeCsvCell).join(',')),
  ];
  return lines.join('\r\n');
}

/**
 * Simple CSV parser for import
 */
export function parseSimpleCsv(text: string): string[][] {
  const lines = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  return lines.map((line) => {
    const values: string[] = [];
    let current = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const c = line[i];
      if (c === '"') {
        if (inQuotes && line[i + 1] === '"') {
          current += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (c === ',' && !inQuotes) {
        values.push(current.trim());
        current = '';
      } else {
        current += c;
      }
    }
    values.push(current.trim());
    return values;
  });
}

/**
 * Reliable clipboard copy for both modern browser clipboard API and fallback
 */
export async function copyTextToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // Fall back to execCommand below
  }

  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    return successful;
  } catch (err) {
    console.error('Failed to copy to clipboard', err);
    return false;
  }
}
