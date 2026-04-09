'use client';

/**
 * DateCell
 * Renders a single day number with the correct visual state:
 *   • Default  – plain number, hover highlight
 *   • Weekend  – blue tint
 *   • Today    – dark navy filled circle + small pip below
 *   • Range start / end – solid blue, half-pill shape
 *   • In range – light blue fill, square (no border-radius)
 *   • Preview range – translucent blue while hovering before selecting end
 */
export default function DateCell({
  day,
  isWeekend,
  isToday,
  isRangeStart,
  isRangeEnd,
  isInRange,
  isPreviewRange,
  onClick,
  onMouseEnter,
  onMouseLeave,
}) {
  let cls = 'dc';

  if (isWeekend && !isToday && !isRangeStart && !isRangeEnd) cls += ' weekend-c';
  if (isToday    && !isRangeStart && !isRangeEnd)            cls += ' today-c';
  if (isRangeStart) cls += ' rs';
  if (isRangeEnd)   cls += ' re';
  if (isInRange)    cls += ' in-range';
  if (isPreviewRange && !isRangeStart && !isRangeEnd) cls += ' preview-range';

  return (
    <div
      className={cls}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      role="button"
      tabIndex={0}
      aria-label={`Day ${day}${isToday ? ' (today)' : ''}${isRangeStart ? ', range start' : ''}${isRangeEnd ? ', range end' : ''}`}
      onKeyDown={(e) => e.key === 'Enter' && onClick?.()}
    >
      {day}
      {/* Small dot beneath today's date when it is not inside a selected range */}
      {isToday && !isRangeStart && !isRangeEnd && <div className="today-pip" />}
    </div>
  );
}
