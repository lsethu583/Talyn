'use client';

import { useRef } from 'react';
import { motion, useAnimationFrame } from 'framer-motion';

const MENTORS = [
  {
    id: 1,
    name: 'Priya Sharma',
    domain: 'Product Design',
    rating: 4.9,
    sessions: 312,
    bio: 'Ex-Flipkart, now Principal Designer at a B2B SaaS.',
    color: '#C2703D',
    initials: 'PS',
  },
  {
    id: 2,
    name: 'Arjun Mehta',
    domain: 'Full-Stack Engineering',
    rating: 4.8,
    sessions: 228,
    bio: 'Staff SWE at Razorpay. TypeScript & distributed systems.',
    color: '#2F6F5E',
    initials: 'AM',
  },
  {
    id: 3,
    name: 'Sneha Iyer',
    domain: 'Data Science',
    rating: 5.0,
    sessions: 180,
    bio: 'ML Lead at PhonePe. Kaggle Grandmaster.',
    color: '#7C5CBF',
    initials: 'SI',
  },
  {
    id: 4,
    name: 'Rahul Gupta',
    domain: 'Growth Marketing',
    rating: 4.7,
    sessions: 395,
    bio: 'Scaled 0→1M users at Meesho. Performance & brand.',
    color: '#C25A6B',
    initials: 'RG',
  },
  {
    id: 5,
    name: 'Divya Nair',
    domain: 'Career Transitions',
    rating: 4.9,
    sessions: 506,
    bio: 'From teacher to PM in 18 months. Now I help others do the same.',
    color: '#D4A843',
    initials: 'DN',
  },
  {
    id: 6,
    name: 'Kiran Bose',
    domain: 'Startup Founding',
    rating: 4.8,
    sessions: 141,
    bio: '3x founder, 1 exit. Loves zero-to-one product strategy.',
    color: '#3A7CBF',
    initials: 'KB',
  },
  {
    id: 7,
    name: 'Meera Pillai',
    domain: 'UX Research',
    rating: 4.9,
    sessions: 267,
    bio: 'Principal UX Researcher, Google India. Mixed methods.',
    color: '#6B8C5E',
    initials: 'MP',
  },
  {
    id: 8,
    name: 'Vikram Joshi',
    domain: 'DevOps & Cloud',
    rating: 4.6,
    sessions: 198,
    bio: 'AWS Hero. Kubernetes and platform engineering at scale.',
    color: '#BF7D3A',
    initials: 'VJ',
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg key={star} width="11" height="11" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
            fill={star <= Math.round(rating) ? '#C2703D' : '#E0D8CE'}
          />
        </svg>
      ))}
      <span className="ml-1 font-mono text-[10.5px] text-ink-soft">{rating.toFixed(1)}</span>
    </div>
  );
}

function MentorCard({ mentor }: { mentor: (typeof MENTORS)[0] }) {
  return (
    <div className="w-[240px] flex-shrink-0 rounded-2xl border border-line bg-card p-5 shadow-[0_4px_20px_-8px_rgba(30,26,21,0.14)] transition-shadow hover:shadow-[0_8px_32px_-8px_rgba(30,26,21,0.22)]">
      {/* Avatar */}
      <div className="mb-4 flex items-center gap-3">
        <div
          className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
          style={{ backgroundColor: mentor.color }}
        >
          {mentor.initials}
        </div>
        <div>
          <p className="text-sm font-semibold text-ink">{mentor.name}</p>
          <StarRating rating={mentor.rating} />
        </div>
      </div>

      {/* Domain badge */}
      <span
        className="mb-3 inline-block rounded-full px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.06em]"
        style={{ backgroundColor: `${mentor.color}18`, color: mentor.color }}
      >
        {mentor.domain}
      </span>

      {/* Bio */}
      <p className="text-xs leading-relaxed text-ink-soft line-clamp-2">{mentor.bio}</p>

      {/* Sessions */}
      <div className="mt-4 flex items-center justify-between border-t border-line pt-3">
        <span className="font-mono text-[10px] uppercase tracking-wider text-ink-soft">
          Sessions
        </span>
        <span className="font-display text-base font-semibold text-ink">
          {mentor.sessions.toLocaleString()}+
        </span>
      </div>
    </div>
  );
}

// Infinite-marquee scroll using Framer Motion's useAnimationFrame
export default function MentorCarousel() {
  // Duplicate the array for seamless looping
  const doubled = [...MENTORS, ...MENTORS];
  const xRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isPaused = useRef(false);

  const CARD_W = 240 + 20; // card width + gap
  const TOTAL = MENTORS.length * CARD_W;

  useAnimationFrame((_, delta) => {
    if (isPaused.current) return;
    xRef.current -= (delta / 1000) * 48; // 48 px/s
    if (xRef.current <= -TOTAL) xRef.current += TOTAL;
    if (containerRef.current) {
      containerRef.current.style.transform = `translateX(${xRef.current}px)`;
    }
  });

  return (
    <section id="mentors" className="overflow-hidden py-20">
      {/* Section header */}
      <div className="mx-auto mb-12 max-w-[1320px] px-6 md:px-12">
        <div className="mb-3 flex items-center gap-2.5 font-mono text-[12.5px] uppercase tracking-[0.06em] text-terracotta-deep">
          <span className="h-[1.5px] w-3.5 bg-terracotta-deep" />
          Meet your future mentors
        </div>
        <h2 className="font-display text-[36px] font-semibold leading-tight tracking-tight md:text-[52px]">
          WORLD-CLASS <span className="text-terracotta italic">GUIDES</span>
        </h2>
        <p className="mt-4 max-w-[480px] text-base leading-relaxed text-ink-soft">
          Every mentor on Mentora is vetted, rated by real mentees, and matched
          to your exact goals — not just domain keywords.
        </p>
      </div>

      {/* Scrolling track */}
      <div
        className="relative"
        onMouseEnter={() => { isPaused.current = true; }}
        onMouseLeave={() => { isPaused.current = false; }}
      >
        {/* Left fade */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-cream to-transparent" />
        {/* Right fade */}
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-cream to-transparent" />

        <div className="overflow-hidden pb-4 pt-2">
          <div ref={containerRef} className="flex gap-5 will-change-transform">
            {doubled.map((mentor, i) => (
              <MentorCard key={`${mentor.id}-${i}`} mentor={mentor} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
