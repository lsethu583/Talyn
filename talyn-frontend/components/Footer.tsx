const FOOTER_LINKS = {
  Platform: ['Find a Mentor', 'Become a Mentor', 'Group Cohorts', 'Pricing'],
  Resources: ['Blog', 'Success Stories', 'Mentor Handbook', 'FAQ'],
  Company: ['About', 'Careers', 'Press', 'Contact'],
  Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy'],
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-ink py-16 text-cream">
      <div className="mx-auto max-w-[1320px] px-6 md:px-12">
        {/* Top row */}
        <div className="mb-12 grid grid-cols-2 gap-y-10 md:grid-cols-[1.6fr_1fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="mb-4 flex items-center gap-2.5 font-display text-xl font-bold tracking-tight">
              <div className="flex h-[32px] w-[32px] items-center justify-center rounded-[8px] bg-cream">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <circle cx="8" cy="8" r="4" fill="#1E1A15" />
                  <circle cx="17" cy="13" r="3" fill="#C2703D" />
                </svg>
              </div>
              mentor<span className="text-terracotta">a</span>
            </div>
            <p className="max-w-[220px] text-sm leading-relaxed text-cream/60">
              India&rsquo;s most trusted mentor-mentee matching platform. Grow more, guess less.
            </p>

            {/* Social icons */}
            <div className="mt-6 flex gap-3">
              {[
                { label: 'Twitter', path: 'M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z' },
                { label: 'LinkedIn', path: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z' },
                { label: 'GitHub', path: 'M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22' },
              ].map(({ label, path }) => (
                <button
                  key={label}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/15 text-cream/50 transition-colors hover:border-cream/40 hover:text-cream"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d={path} />
                  </svg>
                </button>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h4 className="mb-4 font-mono text-[10.5px] uppercase tracking-[0.12em] text-cream/40">
                {category}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-cream/60 transition-colors hover:text-cream"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-cream/10" />

        {/* Bottom row */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="font-mono text-[11px] text-cream/35">
            © {year} Mentora Technologies Pvt. Ltd. · Made with ❤️ in India
          </p>
          <div className="flex items-center gap-1.5 font-mono text-[11px] text-cream/35">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#3F9E6D]" />
            All systems operational
          </div>
        </div>
      </div>
    </footer>
  );
}
