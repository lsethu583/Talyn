'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import AuthModal from './AuthModal';
import ProfileDropdown from './ProfileDropdown';

type ModalTab = 'login' | 'signup';

// Pill-shaped floating nav. Right-hand side is auth-aware:
//  – Guest: Ghost "Login" + terracotta "Sign Up"
//  – Authed: notification bell + profile avatar with dropdown
export default function Navbar() {
  const { user, loading } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState<ModalTab>('login');

  const links = [
    { label: 'Mentors', href: '#mentors' },
    { label: 'How it works', href: '#how-it-works' },
    { label: 'Careers', href: '#careers' },
    { label: 'Contact', href: '#contact' },
  ];

  const openModal = (tab: ModalTab) => {
    setModalTab(tab);
    setModalOpen(true);
  };

  return (
    <>
      <nav className="flex items-center justify-between py-7">
        {/* Logo */}
        <div className="flex items-center gap-2.5 font-display text-[21px] font-bold tracking-tight">
          <div className="flex h-[34px] w-[34px] flex-shrink-0 items-center justify-center rounded-[9px] bg-ink">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <circle cx="8" cy="8" r="4" fill="#F7F2E7" />
              <circle cx="17" cy="13" r="3" fill="#C2703D" />
            </svg>
          </div>
          mentor<span className="text-terracotta">a</span>
        </div>

        {/* Center pill nav */}
        <div className="hidden items-center gap-1.5 rounded-full border border-line bg-card p-1.5 md:flex">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="rounded-full px-4 py-2.5 text-[14.5px] font-medium text-ink transition-colors hover:bg-cream-2"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right-side: auth state */}
        <div className="flex items-center gap-3">
          {!loading && (
            <>
              {user ? (
                <>
                  {/* Notification bell */}
                  <button
                    id="notification-bell"
                    aria-label="Notifications"
                    className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-line bg-card transition-colors hover:bg-cream-2"
                  >
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#1E1A15" strokeWidth="1.8">
                      <path d="M12 3a6 6 0 0 0-6 6v4l-2 3h16l-2-3V9a6 6 0 0 0-6-6Z" />
                      <path d="M10 21a2 2 0 0 0 4 0" />
                    </svg>
                  </button>
                  <ProfileDropdown />
                </>
              ) : (
                <>
                  <button
                    id="navbar-login-btn"
                    onClick={() => openModal('login')}
                    className="rounded-full border border-line px-5 py-2.5 text-[14.5px] font-semibold text-ink transition-colors hover:bg-cream-2"
                  >
                    Login
                  </button>
                  <button
                    id="navbar-signup-btn"
                    onClick={() => openModal('signup')}
                    className="flex items-center gap-2 whitespace-nowrap rounded-full bg-terracotta px-[22px] py-[13px] text-[14.5px] font-semibold text-white transition-colors hover:bg-terracotta-deep"
                  >
                    Sign Up
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </button>
                </>
              )}
            </>
          )}
          {/* Skeleton while auth is resolving */}
          {loading && (
            <div className="h-10 w-28 animate-pulse rounded-full bg-cream-2" />
          )}
        </div>
      </nav>

      <AuthModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultTab={modalTab}
      />
    </>
  );
}
