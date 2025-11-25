import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import STORAGE_KEYS from '~/constants/storageKeys';

export type User = { username: string; name: string; email: string };

type AuthState = {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  setAuth: (p: { user: User; accessToken: string }) => void;
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
      name: STORAGE_KEYS.AUTH,
      partialize: (s) => ({ user: s.user, isAuthenticated: s.isAuthenticated }),
    },
  ),
);
