'use client';
import { WEEKDAYS, buildCells, inRange, sameDay, toNum } from './calendarUtils';
import DateCell from './DateCell';

/**
 * CalendarGrid
 * Renders the day-of-week header row and the full grid of DateCell components
 * for the current month. Animates in on each month change via `gridKey`.
 */
export default function CalendarGrid({
  year,
  month,
  gridKey,
  today,
  rangeStart,
  rangeEnd,
  hoveredDate,
  clickPhase,
  onDateClick,
  onDateHover,
  onDateLeave,
}) {
  const cells = buildCells(year, month);

  return (
    <div className="flex-1 py-4 px-5 pb-5 flex flex-col gap-1 min-w-0">
      {/* Day-of-week header */}
      <div className="grid grid-cols-7 mb-1">
        {WEEKDAYS.map((d, i) => (
          <div
            key={d}
            className={`text-center pb-2 border-b border-slate-100 ${
              i >= 5 ? 'text-blue-400' : 'text-slate-300'
            }`}
            style={{ fontSize: 9.5, fontWeight: 600, letterSpacing: '1.1px' }}
          >
            {d}
          </div>
        ))}
      </div>

      {/* Date cell grid */}
      <div key={gridKey} className="grid grid-cols-7 gap-[1px] mt-1 grid-anim">
        {cells.map((day, idx) => {
          if (!day) {
            return <div key={`empty-${idx}`} className="dc empty" />;
          }

          const col       = idx % 7;
          const isWeekend = col >= 5;
          const dateObj   = { y: year, m: month, d: day };
          const isToday   = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
          const isRS      = sameDay(dateObj, rangeStart);
          const isRE      = sameDay(dateObj, rangeEnd);
          const isInRange = inRange(dateObj, rangeStart, rangeEnd);

          // Preview range — show while user has selected start but not yet end
          const previewEnd = clickPhase === 1 ? hoveredDate : null;
          const isPreview  = !!(previewEnd && !isRS && !isRE && inRange(dateObj, rangeStart, previewEnd));

          return (
            <DateCell
              key={day}
              day={day}
              isWeekend={isWeekend}
              isToday={isToday}
              isRangeStart={isRS}
              isRangeEnd={isRE}
              isInRange={isInRange}
              isPreviewRange={isPreview}
              onClick={() => onDateClick(day)}
              onMouseEnter={() => onDateHover({ y: year, m: month, d: day })}
              onMouseLeave={onDateLeave}
            />
          );
        })}
      </div>
    </div>
  );
}
