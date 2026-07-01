'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import toast from 'react-hot-toast';

export default function ProfileDropdown() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on click outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const initials = user?.email?.slice(0, 2).toUpperCase() ?? 'ME';

  const handleLogout = async () => {
    await logout();
    toast.success('Signed out successfully.');
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      {/* Avatar trigger */}
      <button
        id="profile-avatar-btn"
        onClick={() => setOpen((v) => !v)}
        aria-label="Open profile menu"
        className="flex h-10 w-10 items-center justify-center rounded-full bg-terracotta font-semibold text-sm text-white ring-2 ring-terracotta/30 transition-all hover:ring-4"
      >
        {initials}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ type: 'spring', damping: 20, stiffness: 320 }}
            className="absolute right-0 top-[calc(100%+10px)] z-50 min-w-[220px] rounded-2xl border border-line bg-card p-2 shadow-[0_16px_40px_-8px_rgba(30,26,21,0.18)]"
          >
            {/* User info */}
            <div className="mb-1 px-3 py-2.5">
              <p className="text-sm font-semibold text-ink truncate">{user?.email}</p>
              <div className="mt-0.5 flex items-center gap-1">
                {user?.roles?.map((role) => (
                  <span
                    key={role}
                    className="rounded-full bg-cream px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-ink-soft"
                  >
                    {role}
                  </span>
                ))}
              </div>
            </div>

            <div className="my-1.5 h-px bg-line" />

            {/* Menu items */}
            <button
              id="profile-menu-item"
              onClick={() => setOpen(false)}
              className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-cream"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
              </svg>
              My Profile
            </button>

            <button
              id="logout-btn"
              onClick={handleLogout}
              className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-red-500 transition-colors hover:bg-red-50"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M17 16l4-4m0 0-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1" />
              </svg>
              Sign Out
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
