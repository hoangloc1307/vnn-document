import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import STORAGE_KEYS from '~/constants/storageKeys';
import type { User } from '~/types/me';

type AuthStates = {
  user: User | null;
  menus: string[] | null;
  permissions: string[] | null;
  accessToken: string | null;
  isAuthenticated: boolean;
};

type AuthActions = {
  setAuth: (payload: { accessToken: string }) => void;
  setMe: (payload: { user: User; menus: string[]; permissions: string[] }) => void;
  resetAuth: () => void;
};

export const useAuthStore = create<AuthStates & AuthActions>()(
  persist(
    (set) => ({
      // States
      user: null,
      menus: null,
      permissions: null,
      accessToken: null,
      isAuthenticated: false,

      // Actions
      setAuth: ({ accessToken }) => set({ accessToken, isAuthenticated: true }),
      setMe: ({ user, menus, permissions }) => set({ user, menus, permissions }),
      resetAuth: () =>
        set({
          user: null,
          menus: null,
          permissions: null,
          accessToken: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: STORAGE_KEYS.AUTH,
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
