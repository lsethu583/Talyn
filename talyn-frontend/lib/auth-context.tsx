'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { authApi, UserDto } from './api';

interface AuthState {
  user: (UserDto & { name?: string }) | null;
  accessToken: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<(UserDto & { name?: string }) | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  // keep the latest token in a ref so the axios interceptor always has it
  const tokenRef = useRef<string | null>(null);

  // Attempt a silent token refresh on first mount so returning users
  // stay logged in without re-entering credentials.
  useEffect(() => {
    authApi
      .refresh()
      .then(({ accessToken: token }) => {
        tokenRef.current = token;
        setAccessToken(token);
        // We don't have the user object from a pure refresh — store a
        // minimal sentinel so the Navbar shows the avatar. Phase 2 will
        // add GET /users/me to backfill the full profile.
        const stored = sessionStorage.getItem('mentora_user');
        if (stored) setUser(JSON.parse(stored));
      })
      .catch(() => {
        // No valid refresh cookie — stay logged out; that's fine.
      })
      .finally(() => setLoading(false));
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const { user: u, accessToken: token } = await authApi.login(email, password);
    tokenRef.current = token;
    setAccessToken(token);
    setUser(u);
    sessionStorage.setItem('mentora_user', JSON.stringify(u));
  }, []);

  const register = useCallback(
    async (name: string, email: string, password: string) => {
      await authApi.register(name, email, password);
      // Auto-login after registration
      await login(email, password);
    },
    [login],
  );

  const logout = useCallback(async () => {
    await authApi.logout().catch(() => {});
    tokenRef.current = null;
    setAccessToken(null);
    setUser(null);
    sessionStorage.removeItem('mentora_user');
  }, []);

  return (
    <AuthContext.Provider value={{ user, accessToken, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
