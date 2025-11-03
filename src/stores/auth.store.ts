import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type AuthUser = { username: string; name: string };

type AuthState = {
  user: AuthUser | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  setAuth: (p: { user: AuthUser; accessToken: string }) => void;
  setAccessToken: (t: string | null) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      setAuth: ({ user, accessToken }) => set({ user, accessToken, isAuthenticated: true }),
      setAccessToken: (t) => set((s) => ({ accessToken: t, isAuthenticated: !!t && !!s.user })),
      logout: () => set({ user: null, accessToken: null, isAuthenticated: false }),
    }),
    {
      name: 'auth',
      partialize: (s) => ({ user: s.user, isAuthenticated: s.isAuthenticated }),
    },
  ),
);
