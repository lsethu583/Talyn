// Original, license-free illustration replacing the product photo from the
// reference UI: a mentor and mentee at a table, a growth-chart, and a
// speech-bubble standing in for the device's on-screen percentage readout.
export default function MentorIllustration() {
  return (
    <div className="h-[520px] w-[430px] max-w-full overflow-hidden rounded-xl2 bg-gradient-to-b from-[#E7DCC6] to-terracotta shadow-[0_30px_60px_-20px_rgba(30,26,21,0.35)]">
      <svg viewBox="0 0 430 520" className="h-full w-full">
        <circle cx="345" cy="80" r="70" fill="#E9DDC4" opacity="0.5" />
        <circle cx="60" cy="430" r="90" fill="#F3E9D2" opacity="0.45" />

        {/* table */}
        <rect x="60" y="372" width="310" height="14" rx="7" fill="#1E1A15" opacity="0.85" />
        <rect x="86" y="386" width="14" height="70" fill="#1E1A15" opacity="0.85" />
        <rect x="330" y="386" width="14" height="70" fill="#1E1A15" opacity="0.85" />

        {/* growth chart on table */}
        <g transform="translate(160,300)">
          <rect x="0" y="40" width="14" height="32" rx="3" fill="#2F6F5E" />
          <rect x="20" y="26" width="14" height="46" rx="3" fill="#3F9E6D" />
          <rect x="40" y="6" width="14" height="66" rx="3" fill="#F7F2E7" />
        </g>

        {/* mentee figure */}
        <g transform="translate(95,170)">
          <ellipse cx="40" cy="208" rx="46" ry="10" fill="#1E1A15" opacity="0.12" />
          <rect x="6" y="96" width="68" height="110" rx="26" fill="#2F6F5E" />
          <circle cx="40" cy="56" r="44" fill="#3A2E22" />
          <circle cx="40" cy="60" r="36" fill="#E8B894" />
          <path d="M0 50a40 40 0 0 1 80 0v-6c0-26-18-44-40-44S0 18 0 44Z" fill="#1E1A15" />
          <circle cx="26" cy="62" r="4" fill="#1E1A15" />
          <circle cx="54" cy="62" r="4" fill="#1E1A15" />
          <path d="M28 76q12 10 24 0" stroke="#1E1A15" strokeWidth="3" fill="none" strokeLinecap="round" />
          <rect x="-14" y="118" width="34" height="64" rx="16" fill="#3F9E6D" transform="rotate(18 -14 118)" />
        </g>

        {/* mentor figure */}
        <g transform="translate(235,140)">
          <ellipse cx="48" cy="238" rx="54" ry="11" fill="#1E1A15" opacity="0.12" />
          <rect x="8" y="110" width="80" height="130" rx="28" fill="#C2703D" />
          <circle cx="48" cy="64" r="50" fill="#5B4636" />
          <circle cx="48" cy="70" r="40" fill="#D9A074" />
          <path d="M-2 58a50 50 0 0 1 100 0v-8c0-30-22-50-50-50S-2 20 -2 50Z" fill="#2A2118" />
          <circle cx="32" cy="72" r="4.5" fill="#1E1A15" />
          <circle cx="64" cy="72" r="4.5" fill="#1E1A15" />
          <path d="M34 88q14 10 28 0" stroke="#1E1A15" strokeWidth="3" fill="none" strokeLinecap="round" />
          <rect x="92" y="130" width="36" height="70" rx="17" fill="#A85A2C" transform="rotate(-22 92 130)" />
        </g>

        {/* speech bubble */}
        <g transform="translate(178,90)">
          <path
            d="M0 18a18 18 0 0 1 18-18h44a18 18 0 0 1 18 18v6a18 18 0 0 1-18 18H34l-12 12V42H18A18 18 0 0 1 0 24Z"
            fill="#FFFFFF"
            opacity="0.95"
          />
          <circle cx="20" cy="20" r="3.5" fill="#C2703D" />
          <circle cx="32" cy="20" r="3.5" fill="#C2703D" />
          <circle cx="44" cy="20" r="3.5" fill="#C2703D" />
        </g>

        {/* plant / growth motif */}
        <g transform="translate(40,60)">
          <path d="M10 70V30" stroke="#2F6F5E" strokeWidth="4" strokeLinecap="round" />
          <path d="M10 30c0-14 12-20 18-20-2 14-8 20-18 20Z" fill="#3F9E6D" />
          <path d="M10 46c0-12-10-16-16-16 2 12 8 16 16 16Z" fill="#2F6F5E" />
        </g>
      </svg>
    </div>
  );
}
