'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '@/lib/auth-context';

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  defaultTab?: 'login' | 'signup';
}

type Tab = 'login' | 'signup';

export default function AuthModal({ open, onClose, defaultTab = 'login' }: AuthModalProps) {
  const { login, register } = useAuth();
  const [tab, setTab] = useState<Tab>(defaultTab);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Reset form when tab changes or modal closes
  useEffect(() => {
    setErrors({});
    setName('');
    setEmail('');
    setPassword('');
  }, [tab, open]);

  useEffect(() => {
    if (defaultTab) setTab(defaultTab);
  }, [defaultTab]);

  // Close on ESC
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (tab === 'signup' && name.trim().length < 2) errs.name = 'Name must be at least 2 characters.';
    if (!email.includes('@')) errs.email = 'Enter a valid email address.';
    if (password.length < 8) errs.password = 'Password must be at least 8 characters.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      if (tab === 'login') {
        await login(email, password);
        toast.success('Welcome back! 👋');
      } else {
        await register(name, email, password);
        toast.success('Account created! Welcome to Mentora 🎉');
      }
      onClose();
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ??
        'Something went wrong. Please try again.';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (field: string) =>
    `w-full rounded-xl border px-4 py-3 text-sm font-medium outline-none transition-all placeholder:text-[#9B9489] bg-[#FDFAF5] ${
      errors[field]
        ? 'border-red-400 focus:ring-2 focus:ring-red-200'
        : 'border-[rgba(30,26,21,0.12)] focus:border-terracotta focus:ring-2 focus:ring-terracotta/20'
    }`;

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ type: 'spring', damping: 22, stiffness: 350 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full max-w-md rounded-2xl border border-line bg-card p-8 shadow-2xl">
              {/* Header */}
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 font-display text-xl font-semibold text-ink">
                    <div className="flex h-7 w-7 items-center justify-center rounded-[7px] bg-ink">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <circle cx="8" cy="8" r="4" fill="#F7F2E7" />
                        <circle cx="17" cy="13" r="3" fill="#C2703D" />
                      </svg>
                    </div>
                    mentor<span className="text-terracotta">a</span>
                  </div>
                  <p className="mt-1 text-xs text-ink-soft">
                    {tab === 'login' ? 'Sign in to your account' : 'Create your free account'}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-ink-soft hover:bg-cream-2 transition-colors"
                  aria-label="Close modal"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Tabs */}
              <div className="mb-6 flex rounded-xl border border-line bg-cream p-1">
                {(['login', 'signup'] as Tab[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={`flex-1 rounded-lg py-2 text-sm font-semibold transition-all ${
                      tab === t
                        ? 'bg-card text-ink shadow-sm'
                        : 'text-ink-soft hover:text-ink'
                    }`}
                  >
                    {t === 'login' ? 'Sign In' : 'Sign Up'}
                  </button>
                ))}
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
                <AnimatePresence mode="wait">
                  {tab === 'signup' && (
                    <motion.div
                      key="name-field"
                      initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink-soft">
                        Full Name
                      </label>
                      <input
                        id="auth-name"
                        type="text"
                        autoComplete="name"
                        placeholder="Alex Johnson"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={inputClass('name')}
                      />
                      {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                    </motion.div>
                  )}
                </AnimatePresence>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink-soft">
                    Email Address
                  </label>
                  <input
                    id="auth-email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputClass('email')}
                  />
                  {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink-soft">
                    Password
                  </label>
                  <input
                    id="auth-password"
                    type="password"
                    autoComplete={tab === 'login' ? 'current-password' : 'new-password'}
                    placeholder={tab === 'login' ? '••••••••' : 'Min. 8 characters'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={inputClass('password')}
                  />
                  {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
                </div>

                <motion.button
                  id="auth-submit"
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="mt-1 flex w-full items-center justify-center gap-2 rounded-full bg-terracotta py-3.5 text-sm font-semibold text-white transition-colors hover:bg-terracotta-deep disabled:opacity-60"
                >
                  {loading ? (
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" />
                      <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                  ) : null}
                  {tab === 'login' ? 'Sign In' : 'Create Account'}
                </motion.button>
              </form>

              <p className="mt-5 text-center text-xs text-ink-soft">
                {tab === 'login' ? "Don't have an account? " : 'Already have an account? '}
                <button
                  type="button"
                  onClick={() => setTab(tab === 'login' ? 'signup' : 'login')}
                  className="font-semibold text-terracotta hover:underline"
                >
                  {tab === 'login' ? 'Sign up free' : 'Sign in'}
                </button>
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
