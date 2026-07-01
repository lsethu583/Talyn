import type { Config } from 'tailwindcss';

// Tokens lifted 1:1 from the approved UI reference — these are the only
// colors/fonts components are allowed to use, so the page can't drift
// from the design over time.
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#F7F2E7',
        'cream-2': '#F1EADC',
        ink: '#1E1A15',
        'ink-soft': '#564E40',
        terracotta: '#C2703D',
        'terracotta-deep': '#A85A2C',
        teal: '#2F6F5E',
        card: '#FFFFFF',
        line: 'rgba(30,26,21,0.10)',
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'serif'],
        sans: ['var(--font-inter)', 'sans-serif'],
        mono: ['var(--font-jbmono)', 'monospace'],
      },
      borderRadius: {
        xl2: '28px',
      },
    },
  },
  plugins: [],
};

export default config;
