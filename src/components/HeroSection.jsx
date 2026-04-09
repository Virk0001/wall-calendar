'use client';
import { MONTHS, HERO_IMAGES } from './calendarUtils';

/**
 * HeroSection
 * Full-bleed image with an angled chevron overlay (matching the reference image)
 * and a month/year badge in the bottom-right corner.
 */
export default function HeroSection({ year, month }) {
  const src = HERO_IMAGES[month];

  return (
    <div className="relative overflow-hidden" style={{ height: 270 }}>
      {/* Background image */}
      <img
        key={`${year}-${month}`}
        src={src}
        alt={`${MONTHS[month]} ${year}`}
        className="w-full h-full object-cover hero-slide-enter"
        draggable={false}
      />

      {/* Geometric chevron overlay — two triangular wedges meeting at centre */}
      <svg
        viewBox="0 0 840 90"
        preserveAspectRatio="none"
        className="absolute bottom-0 left-0 w-full"
        style={{ height: 90, pointerEvents: 'none' }}
        aria-hidden="true"
      >
        {/* Left wing */}
        <polygon points="0,90 0,28 420,90" fill="#1A5C9E" opacity="0.93" />
        {/* Right wing */}
        <polygon points="840,90 840,28 420,90" fill="#1A5C9E" opacity="0.93" />
        {/* Centre cap — slightly darker diamond tip */}
        <polygon points="360,90 420,60 480,90" fill="#0D3E72" opacity="0.97" />
      </svg>

      {/* Month / Year badge */}
      <div
        className="absolute bottom-3 right-5 text-right text-white select-none"
        style={{ textShadow: '0 2px 10px rgba(0,0,0,0.45)', zIndex: 2 }}
      >
        <span
          className="block tracking-[4px] opacity-80"
          style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 13, fontWeight: 500 }}
        >
          {year}
        </span>
        <span
          className="block leading-none tracking-wide"
          style={{ fontFamily: 'var(--font-playfair)', fontSize: 40, fontWeight: 900 }}
        >
          {MONTHS[month].toUpperCase()}
        </span>
      </div>
    </div>
  );
}
