import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import STORAGE_KEYS from '~/constants/storageKeys';

export type User = { username: string; name: string; email: string };

type AuthState = {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  setAuth: (payload: { user: User; accessToken: string }) => void;
  setAccessToken: (token: string | null) => void;
  resetAuth: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      setAuth: ({ user, accessToken }) => set({ user, accessToken, isAuthenticated: true }),
      setAccessToken: (token) =>
        set((state) => ({ accessToken: token, isAuthenticated: !!token && !!state.user })),
      resetAuth: () => set({ user: null, accessToken: null, isAuthenticated: false }),
    }),
    {
      name: STORAGE_KEYS.AUTH,
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    },
  ),
);
