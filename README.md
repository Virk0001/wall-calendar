# 📅 Wall Calendar

A production-quality interactive wall calendar built with **Next.js 14**, **React 18**, and **Tailwind CSS**.  
Inspired by the look and feel of a physical spiral-bound desk calendar.

---

## ✨ Features

| Feature | Details |
|---|---|
| **Wall calendar aesthetic** | Hero image, geometric chevron overlay, spiral binding effect |
| **Monthly hero images** | 12 unique Unsplash nature photos, one per month |
| **Calendar grid** | Mon → Sun layout with correct date alignment |
| **Today indicator** | Dark navy highlight + small pip dot |
| **Weekend highlighting** | SAT & SUN columns tinted blue |
| **Date range selection** | Click once for start, again for end, third click resets |
| **Range preview** | Hover after selecting start to preview the range in real time |
| **Notes panel** | Lined notepad per month; notes persist across sessions |
| **Month navigation** | Previous/Next buttons with smooth hero image + grid transitions |
| **Persistence** | `localStorage` — notes, selected range, and current month survive page refresh |
| **Responsive** | Desktop split-layout; mobile stacks vertically |

---

## 🚀 Setup

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev

# 3. Open in browser
open http://localhost:3000
```

### Production build
```bash
npm run build
npm run start
```

---

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css          # Tailwind base + custom CSS (coils, date cells…)
│   ├── layout.js            # Root Next.js layout
│   └── page.js              # Entry page
└── components/
    ├── calendarUtils.js     # Pure helpers: date math, storage, constants
    ├── WallCalendar.jsx     # Root component — owns all state & persistence
    ├── SpiralBinding.jsx    # Decorative coil row at the top of the card
    ├── HeroSection.jsx      # Full-bleed image + chevron overlay + month badge
    ├── NavigationBar.jsx    # Prev/Next buttons + month/year display
    ├── CalendarGrid.jsx     # Day-header row + grid of DateCell components
    ├── DateCell.jsx         # Single day tile with all visual states
    └── NotesPanel.jsx       # Lined notepad panel with textarea
```

---

## 🎨 Design Decisions

- **Fonts**: Playfair Display (headings/month name) + DM Sans (UI text)
- **Accent blue**: `#1565C0` — matches the reference calendar's blue chevron
- **Today**: Dark navy `#0A2540` to stand out without clashing with the selection range
- **Chevron overlay**: SVG polygon shapes that match the zig-zag in the reference image
- **Spiral coils**: Pure CSS — gradient + border-radius + box-shadow
- **Notes ruled lines**: Absolutely-positioned `div`s; textarea floats above them

---

## 🔧 Tech Stack

- [Next.js 14](https://nextjs.org/) (App Router)
- [React 18](https://react.dev/)
- [Tailwind CSS 3](https://tailwindcss.com/)
- No external calendar libraries
- No backend

---

## 📱 Responsive Behaviour

| Viewport | Layout |
|---|---|
| `> 580px` | Notes panel (188 px) + Calendar grid side by side |
| `≤ 580px` | Notes panel width shrinks to 140 px |
| `≤ 420px` | Notes panel stacks above the calendar grid |
