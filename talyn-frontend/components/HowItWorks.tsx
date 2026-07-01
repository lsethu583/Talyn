'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const STEPS = [
  {
    number: '01',
    title: 'Find Your Mentor',
    description:
      'Tell us your goals, domain, and where you are in your career. Our matching engine surfaces the top mentors for your exact situation.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>
    ),
    accent: '#C2703D',
  },
  {
    number: '02',
    title: 'Book a Session',
    description:
      'Pick a time that works. Video calls, async Q&A, or structured 4-week sprints — you choose the format that fits your learning style.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
        <line x1="16" x2="16" y1="2" y2="6" />
        <line x1="8" x2="8" y1="2" y2="6" />
        <line x1="3" x2="21" y1="10" y2="10" />
        <path d="M8 14h.01M12 14h.01M16 14h.01" />
      </svg>
    ),
    accent: '#2F6F5E',
  },
  {
    number: '03',
    title: 'Track Your Growth',
    description:
      'Goal dashboards, session notes, and a progress timeline keep you and your mentor aligned — so every call moves the needle.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    accent: '#7C5CBF',
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: 'easeOut' as const },
  },
};

export default function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="how-it-works" className="py-20">
      {/* Header */}
      <div className="mb-14 text-center">
        <div className="mb-3 flex items-center justify-center gap-2.5 font-mono text-[12.5px] uppercase tracking-[0.06em] text-terracotta-deep">
          <span className="h-[1.5px] w-3.5 bg-terracotta-deep" />
          Simple. Structured. Effective.
          <span className="h-[1.5px] w-3.5 bg-terracotta-deep" />
        </div>
        <h2 className="font-display text-[36px] font-semibold leading-tight tracking-tight md:text-[52px]">
          HOW IT <span className="text-terracotta italic">WORKS</span>
        </h2>
        <p className="mx-auto mt-4 max-w-[460px] text-base leading-relaxed text-ink-soft">
          Three steps from where you are now to where you want to be.
        </p>
      </div>

      {/* Steps grid */}
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="grid grid-cols-1 gap-6 md:grid-cols-3"
      >
        {STEPS.map((step) => (
          <motion.div
            key={step.number}
            variants={cardVariants}
            className="group relative overflow-hidden rounded-2xl border border-line bg-card p-8 transition-shadow hover:shadow-[0_12px_36px_-12px_rgba(30,26,21,0.18)]"
          >
            {/* Large step number watermark */}
            <div
              className="pointer-events-none absolute right-5 top-4 font-display text-[80px] font-bold leading-none opacity-[0.055]"
              style={{ color: step.accent }}
            >
              {step.number}
            </div>

            {/* Icon */}
            <div
              className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl"
              style={{ backgroundColor: `${step.accent}18`, color: step.accent }}
            >
              {step.icon}
            </div>

            <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.1em] text-ink-soft">
              Step {step.number}
            </p>
            <h3 className="mb-3 font-display text-xl font-semibold text-ink">{step.title}</h3>
            <p className="text-sm leading-relaxed text-ink-soft">{step.description}</p>

            {/* Bottom accent bar */}
            <div
              className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r transition-all duration-500 group-hover:w-full"
              style={{
                backgroundImage: `linear-gradient(90deg, ${step.accent}, transparent)`,
              }}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
