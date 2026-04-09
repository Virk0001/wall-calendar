'use client';

/**
 * SpiralBinding
 * Renders a row of metal coils that simulate a spiral-bound notepad.
 */
export default function SpiralBinding({ count = 22 }) {
  return (
    <div className="flex justify-center px-5 relative z-10 mb-[-2px]">
      <div
        className="flex gap-[14px] items-start px-4 py-0 w-full justify-center rounded-t-sm"
        style={{ background: '#4A6578', paddingTop: '3px', paddingBottom: '3px' }}
      >
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="coil" />
        ))}
      </div>
    </div>
  );
}
