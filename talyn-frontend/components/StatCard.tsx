type StatCardProps = {
  label: string;
  value: string;
  caption: string;
  live?: boolean;
  className?: string;
  align?: 'left' | 'right';
};

// One reusable shape for all three floating cards in the reference UI
// (Stations / Cities / Live Charging -> Mentors / Live match / Sessions).
export default function StatCard({ label, value, caption, live, className = '', align = 'left' }: StatCardProps) {
  return (
    <div
      className={`absolute rounded-2xl border border-line bg-card px-5 py-4 shadow-[0_18px_40px_-16px_rgba(30,26,21,0.18)] ${
        align === 'right' ? 'text-right' : 'text-left'
      } ${className}`}
    >
      <div className="flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-[0.08em] text-ink-soft">
        {live && <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#3F9E6D]" />}
        {label}
      </div>
      <div className="mt-1 font-display text-[30px] font-semibold">{value}</div>
      <div className="mt-0.5 text-xs text-ink-soft">{caption}</div>
    </div>
  );
}
