export const WEEKDAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

export const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

/**
 * Hero images from Unsplash — one per month.
 * Each image is chosen to evoke the mood of that season.
 */
export const HERO_IMAGES = [
  'https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=1000&q=80', // Jan – winter peaks
  'https://images.unsplash.com/photo-1418985991508-e47386d96a71?w=1000&q=80', // Feb – snow path
  'https://images.unsplash.com/photo-1457269449834-928af64c684d?w=1000&q=80', // Mar – spring buds
  'https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?w=1000&q=80', // Apr – meadow
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1000&q=80', // May – forest path
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1000&q=80', // Jun – beach
  'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1000&q=80', // Jul – aerial alps
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1000&q=80', // Aug – dramatic peaks
  'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=1000&q=80', // Sep – autumn forest
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1000&q=80', // Oct – misty sunrise
  'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=1000&q=80', // Nov – misty forest
  'https://images.unsplash.com/photo-1490682143684-14369e18dce8?w=1000&q=80', // Dec – winter lake
];

/** Returns number of days in a month. */
export function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

/**
 * Returns the 0-indexed start column (Mon=0 … Sun=6)
 * for the first day of the given month.
 */
export function getMonthStartCol(year, month) {
  const day = new Date(year, month, 1).getDay(); // 0=Sun
  return day === 0 ? 6 : day - 1;
}

/** Convert a date object { y, m, d } to a sortable integer. */
export function toNum({ y, m, d }) {
  return y * 10000 + m * 100 + d;
}

/** Returns true when two date objects represent the same calendar day. */
export function sameDay(a, b) {
  return a && b && a.y === b.y && a.m === b.m && a.d === b.d;
}

/**
 * Returns true when `date` falls strictly between `start` and `end`
 * (exclusive), regardless of which is earlier.
 */
export function inRange(date, start, end) {
  if (!start || !end) return false;
  const v  = toNum(date);
  const lo = Math.min(toNum(start), toNum(end));
  const hi = Math.max(toNum(start), toNum(end));
  return v > lo && v < hi;
}

/**
 * Build the flat cell array for the calendar grid.
 * Null values represent empty leading cells before the 1st of the month.
 */
export function buildCells(year, month) {
  const days    = getDaysInMonth(year, month);
  const startCol = getMonthStartCol(year, month);
  const cells   = Array(startCol).fill(null);
  for (let d = 1; d <= days; d++) cells.push(d);
  return cells;
}

/** Format a date object { y, m, d } to a human-readable short string. */
export function fmtDate({ d, m }) {
  return `${d} ${MONTHS[m].slice(0, 3)}`;
}

/** Storage key for a given year/month. */
export function notesKey(year, month) {
  return `wc-notes-${year}-${month}`;
}

/** Load all persisted data from localStorage. */
export function loadStorage() {
  try {
    const raw = localStorage.getItem('wall-calendar');
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

/** Persist data to localStorage. */
export function saveStorage(data) {
  try {
    localStorage.setItem('wall-calendar', JSON.stringify(data));
  } catch {
    /* quota exceeded – fail silently */
  }
}
