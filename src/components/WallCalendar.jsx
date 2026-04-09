'use client';
import { useState, useEffect, useCallback } from 'react';
import SpiralBinding   from './SpiralBinding';
import HeroSection     from './HeroSection';
import NavigationBar   from './NavigationBar';
import CalendarGrid    from './CalendarGrid';
import NotesPanel      from './NotesPanel';
import { loadStorage, saveStorage, notesKey } from './calendarUtils';

/**
 * WallCalendar
 * Root component that owns all state.
 * Persists notes, selected range, and last-viewed month to localStorage.
 *
 * Date-range selection flow:
 *   Click 1 → set range start
 *   Click 2 → set range end
 *   Click 3 → reset selection
 */
export default function WallCalendar() {
  const today = new Date();

  /* ── View state ─────────────────────────────────────── */
  const [year,  setYear]  = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [gridKey, setGridKey] = useState(0); // bumped to trigger grid animation

  /* ── Selection state ─────────────────────────────────── */
  const [rangeStart,  setRangeStart]  = useState(null);
  const [rangeEnd,    setRangeEnd]    = useState(null);
  const [clickPhase,  setClickPhase]  = useState(0); // 0 | 1 | 2
  const [hoveredDate, setHoveredDate] = useState(null);

  /* ── Notes state (keyed by "year-month") ─────────────── */
  const [notes, setNotes] = useState({});

  /* ── Load persisted data on mount ────────────────────── */
  useEffect(() => {
    const data = loadStorage();
    if (data.notes)      setNotes(data.notes);
    if (data.rangeStart) { setRangeStart(data.rangeStart); setClickPhase(data.rangeEnd ? 2 : 1); }
    if (data.rangeEnd)   setRangeEnd(data.rangeEnd);
    if (data.year  != null) setYear(data.year);
    if (data.month != null) setMonth(data.month);
  }, []);

  /* ── Persist whenever relevant state changes ─────────── */
  const [isLoaded, setIsLoaded] = useState(false);

  // Load data
  useEffect(() => {
    const data = loadStorage();
    if (data.notes) setNotes(data.notes);
    if (data.rangeStart) {
      setRangeStart(data.rangeStart);
      setClickPhase(data.rangeEnd ? 2 : 1);
    }
    if (data.rangeEnd) setRangeEnd(data.rangeEnd);
    if (data.year != null) setYear(data.year);
    if (data.month != null) setMonth(data.month);

    setIsLoaded(true); // ✅ important
  }, []);

  // Save ONLY after loading is done
  useEffect(() => {
    if (!isLoaded) return;

    saveStorage({ notes, rangeStart, rangeEnd, year, month });
  }, [notes, rangeStart, rangeEnd, year, month, isLoaded]);

  /* ── Month navigation ─────────────────────────────────── */
  const navigate = useCallback((dir) => {
    setYear ((y) => {
      const newM = month + dir;
      if (newM < 0)  return y - 1;
      if (newM > 11) return y + 1;
      return y;
    });
    setMonth((m) => {
      const newM = m + dir;
      if (newM < 0)  return 11;
      if (newM > 11) return 0;
      return newM;
    });
    setGridKey((k) => k + 1);
  }, [month]);

  /* ── Date click handler ───────────────────────────────── */
  const handleDateClick = useCallback((day) => {
    const dateObj = { y: year, m: month, d: day };

    if (clickPhase === 0 || clickPhase === 2) {
      // First click or third click: (re)set start
      if (clickPhase === 2) {
        // Third click — reset everything
        setRangeStart(null);
        setRangeEnd(null);
        setClickPhase(0);
        return;
      }
      setRangeStart(dateObj);
      setRangeEnd(null);
      setClickPhase(1);
    } else {
      // Second click: set end
      setRangeEnd(dateObj);
      setClickPhase(2);
    }
  }, [year, month, clickPhase]);

  /* ── Hover handlers (range preview) ─────────────────── */
  const handleDateHover = useCallback((dateObj) => {
    if (clickPhase === 1) setHoveredDate(dateObj);
  }, [clickPhase]);

  const handleDateLeave = useCallback(() => {
    setHoveredDate(null);
  }, []);

  /* ── Notes update ─────────────────────────────────────── */
  const handleNotesChange = useCallback((val) => {
    const key = notesKey(year, month);
    setNotes((prev) => ({ ...prev, [key]: val }));
  }, [year, month]);

  const currentNotes = notes[notesKey(year, month)] || '';

  /* ── Render ───────────────────────────────────────────── */
  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Decorative spiral binding at the top */}
      <SpiralBinding count={22} />

      {/* Calendar card */}
      <div
        className="w-full overflow-hidden"
        style={{
          background: '#FAFAF8',
          borderRadius: '0 0 10px 10px',
          boxShadow: '0 24px 56px rgba(0,0,0,0.28), 0 8px 22px rgba(0,0,0,0.14)',
        }}
      >
        {/* Hero image + month badge */}
        <HeroSection year={year} month={month} />

        {/* Navigation strip */}
        <NavigationBar
          year={year}
          month={month}
          onPrev={() => navigate(-1)}
          onNext={() => navigate(1)}
        />

        {/* Notes + Calendar grid */}
        <div className="flex min-h-[260px]">
          <NotesPanel
            year={year}
            month={month}
            value={currentNotes}
            onChange={handleNotesChange}
            rangeStart={rangeStart}
            rangeEnd={rangeEnd}
          />
          <CalendarGrid
            year={year}
            month={month}
            gridKey={gridKey}
            today={today}
            rangeStart={rangeStart}
            rangeEnd={rangeEnd}
            hoveredDate={hoveredDate}
            clickPhase={clickPhase}
            onDateClick={handleDateClick}
            onDateHover={handleDateHover}
            onDateLeave={handleDateLeave}
          />
        </div>

        {/* Legend / instruction strip */}
        <div
          className="flex flex-wrap items-center gap-3 px-5 py-2 border-t"
          style={{ borderColor: '#F0F4F8', fontSize: 10, color: '#A0B2BF' }}
        >
          <LegendDot color="#0A2540"   label="Today"           />
          <LegendDot color="#1565C0"   label="Range start/end" />
          <LegendDot color="#BBDEFB"   label="In range"        />
          <LegendDot color="#1E88E5"   label="Weekends"        />
          <span className="ml-auto italic" style={{ fontSize: 9 }}>
            Click 1×&nbsp;start · 2×&nbsp;end · 3×&nbsp;reset
          </span>
        </div>
      </div>
    </div>
  );
}

/* ── Small helper ──────────────────────────────────────── */
function LegendDot({ color, label }) {
  return (
    <span className="flex items-center gap-1">
      <span
        style={{
          display:       'inline-block',
          width:          8,
          height:         8,
          borderRadius:  '50%',
          background:    color,
          flexShrink:    0,
        }}
      />
      {label}
    </span>
  );
}
