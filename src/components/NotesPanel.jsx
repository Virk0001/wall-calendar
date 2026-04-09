'use client';
import { MONTHS, fmtDate } from './calendarUtils';

const LINE_COUNT = 13;

/**
 * NotesPanel
 * Renders a lined notepad panel on the left side of the calendar.
 * Notes are per-month and persisted externally (in WallCalendar state/localStorage).
 * Displays a selection range badge when a date range is active.
 */
export default function NotesPanel({
  year,
  month,
  value,
  onChange,
  rangeStart,
  rangeEnd,
}) {
  const hasRange = rangeStart && rangeEnd;
  const placeholder = `${MONTHS[month]} notes…`;

  return (
    <div
      className="relative overflow-hidden flex-shrink-0"
      style={{
        width: 188,
        background: '#FEFEF5',
        borderRight: '1px solid #E8ECF0',
        padding: '18px 14px 18px 26px',
      }}
    >
      {/* Red margin line (like a real notepad) */}
      <div
        className="absolute top-0 bottom-0"
        style={{ left: 22, width: 1, background: 'rgba(220,80,80,0.22)', pointerEvents: 'none' }}
      />

      {/* Horizontal ruled lines */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {Array.from({ length: LINE_COUNT }).map((_, i) => (
          <div key={i} style={{ borderBottom: '1px solid #E5EBF0', height: 26 }} />
        ))}
      </div>

      {/* "Notes" label */}
      <div
        className="relative z-10 mb-2"
        style={{ fontSize: 9, fontWeight: 600, letterSpacing: '2.5px', color: '#A0B2C0', textTransform: 'uppercase' }}
      >
        Notes
      </div>

      {/* Textarea — floats over the ruled lines */}
      <textarea
        className="notes-ta"
        style={{ height: hasRange ? 192 : 216 }}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={`Notes for ${MONTHS[month]} ${year}`}
        spellCheck={false}
      />

      {/* Range selection badge */}
      {hasRange && (
        <div
          className="absolute bottom-3 left-2 right-2 rounded text-center z-10"
          style={{
            fontSize: 9,
            fontWeight: 600,
            letterSpacing: '0.3px',
            color: '#1565C0',
            background: '#E3F2FD',
            padding: '4px 6px',
            lineHeight: 1.4,
          }}
        >
          {fmtDate(rangeStart)} → {fmtDate(rangeEnd)}
        </div>
      )}

      {/* "Awaiting end date" hint */}
      {rangeStart && !rangeEnd && (
        <div
          className="absolute bottom-3 left-2 right-2 rounded text-center z-10 italic"
          style={{
            fontSize: 9,
            fontWeight: 500,
            color: '#90A4AE',
            background: '#F1F7FA',
            padding: '4px 6px',
            lineHeight: 1.4,
          }}
        >
          from {fmtDate(rangeStart)} — hover to preview
        </div>
      )}
    </div>
  );
}
