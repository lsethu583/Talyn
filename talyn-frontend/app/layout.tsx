import type { Metadata } from 'next';
import { Fraunces, Inter, JetBrains_Mono } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '@/lib/auth-context';
import './globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-fraunces',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
});

const jbMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jbmono',
});

export const metadata: Metadata = {
  title: 'Mentora — Grow More, Guess Less',
  description: 'A mentor-mentee matching platform, session tools, and growth tracking.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable} ${jbMono.variable}`}>
      <body>
        <AuthProvider>
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: '#1E1A15',
                color: '#F7F2E7',
                fontFamily: 'var(--font-inter)',
                fontSize: '13.5px',
                borderRadius: '12px',
                padding: '12px 16px',
              },
              success: { iconTheme: { primary: '#3F9E6D', secondary: '#F7F2E7' } },
              error: { iconTheme: { primary: '#C25A6B', secondary: '#F7F2E7' } },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}
