import StatCard from './StatCard';
import MentorIllustration from './MentorIllustration';

// Mirrors the reference UI section-for-section: eyebrow -> two-line serif
// headline with an italic accent line -> supporting paragraph -> primary +
// ghost CTA pair -> small certification line, with a right-hand illustration
// panel surrounded by three floating stat cards.
export default function Hero() {
  return (
    <section className="grid grid-cols-1 items-center gap-10 py-16 md:grid-cols-[1fr_0.92fr] md:py-24">
      <div>
        <div className="mb-[22px] flex items-center gap-2.5 font-mono text-[12.5px] uppercase tracking-[0.06em] text-terracotta-deep">
          <span className="h-[1.5px] w-3.5 bg-terracotta-deep" />
          India · Mentor &amp; Mentee Network
        </div>

        <h1 className="font-display text-[44px] font-semibold leading-[0.98] tracking-tight md:text-[74px]">
          GROW MORE
          <span className="headline-accent">GUESS LESS</span>
        </h1>

        <p className="mt-7 max-w-[480px] text-lg leading-relaxed text-ink-soft">
          A matching platform, session tools, and growth tracking for mentees, mentors, and the
          teams who run cohort programs.
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-3.5">
          <button className="flex items-center gap-2 rounded-full bg-terracotta px-[22px] py-[13px] text-[14.5px] font-semibold text-white transition-colors hover:bg-terracotta-deep">
            Find a mentor
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
          <button className="rounded-full border border-line px-[22px] py-[13px] text-[14.5px] font-semibold text-ink">
            Become a mentor
          </button>
        </div>

        <div className="mt-10 flex flex-col gap-1.5 font-mono text-[11.5px] tracking-[0.02em] text-ink-soft">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-teal" />
            VERIFIED MENTOR PROFILES &nbsp; OAUTH 2.0 SECURE LOGIN
          </div>
          <div className="ml-3.5">ARGON2 ENCRYPTED · ROLE-BASED ACCESS</div>
        </div>
      </div>

      <div className="relative flex min-h-[420px] items-center justify-center md:min-h-[560px]">
        <StatCard
          label="Mentors"
          value="2,480+"
          caption="Active across India"
          className="left-0 top-2 md:-left-2.5 md:top-[18px]"
        />
        <StatCard
          label="Live match"
          value="94%"
          caption="Fit score · UX Design"
          live
          className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:left-[-34px] md:top-[46%] md:translate-x-0"
        />
        <StatCard
          label="Sessions"
          value="31,600+"
          caption="Completed this year"
          align="right"
          className="bottom-2 right-0 md:bottom-16 md:-right-[18px]"
        />

        <MentorIllustration />
      </div>
    </section>
  );
}
