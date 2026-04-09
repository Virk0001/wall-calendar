'use client';
import { MONTHS } from './calendarUtils';

/**
 * NavigationBar
 * Dark blue strip below the hero with previous/next controls and
 * the current month + year displayed in the centre.
 */
export default function NavigationBar({ year, month, onPrev, onNext }) {
  return (
    <div
      className="flex items-center justify-between px-6 py-2"
      style={{ background: '#0A2540' }}
    >
      <button
        className="nav-btn"
        onClick={onPrev}
        aria-label="Previous month"
      >
        ‹
      </button>

      <div className="flex flex-col items-center gap-0">
        <span
          className="text-white tracking-wide"
          style={{ fontFamily: 'var(--font-playfair)', fontSize: 17, fontWeight: 700 }}
        >
          {MONTHS[month]}
        </span>
        <span
          className="text-white/55 tracking-[3px]"
          style={{ fontSize: 10, fontWeight: 500 }}
        >
          {year}
        </span>
      </div>

      <button
        className="nav-btn"
        onClick={onNext}
        aria-label="Next month"
      >
        ›
      </button>
    </div>
  );
}
