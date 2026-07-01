# Mentora — Next.js Frontend

A Next.js (App Router) + TypeScript + Tailwind rebuild of the approved landing
page UI: pill nav, eyebrow label, two-line serif headline with an italic
accent, floating stat cards, and an illustration panel — replacing the
charger-device photo with an original SVG of a mentor/mentee session.

## Structure
```
app/
├── layout.tsx       # fonts (Fraunces / Inter / JetBrains Mono) + global shell
├── page.tsx         # composes Navbar + Hero
└── globals.css       # Tailwind base + .headline-accent utility

components/
├── Navbar.tsx              # logo, pill nav links, notification icon, CTA
├── Hero.tsx                # eyebrow, headline, copy, CTAs, trust line, art panel
├── StatCard.tsx             # reusable floating stat card (used 3x)
└── MentorIllustration.tsx   # original SVG illustration (no stock imagery)
```

Every color, font, and radius used by these components is defined once in
`tailwind.config.ts`, so the UI can't silently drift from the approved design.

## Setup
```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (verified passing)
```
