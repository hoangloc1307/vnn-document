import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import STORAGE_KEYS from '~/constants/storageKeys';
import { applyTheme, setupSystemListener } from '~/utils/theme';

export type ThemeMode = 'light' | 'dark' | 'system';

type ThemeState = {
  theme: ThemeMode;
};

type ThemeActions = {
  setTheme: (t: ThemeMode) => void;
  init: () => void;
};

export const useThemeStore = create<ThemeState & ThemeActions>()(
  persist(
    (set, get) => ({
      theme: 'system',

      setTheme: (t) => {
        set({ theme: t });
        applyTheme(t);
        setupSystemListener(t, get);
      },

      init: () => {
        applyTheme(get().theme);
        setupSystemListener(get().theme, get);
      },
    }),
    {
      name: STORAGE_KEYS.THEME,
      partialize: (s) => ({ theme: s.theme }),
    },
  ),
);
