import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import STORAGE_KEYS from '~/constants/storageKeys';
import { applyTheme, setupSystemListener } from '~/utils/theme';

export type ThemeMode = 'light' | 'dark' | 'system';

type ThemeStates = {
  theme: ThemeMode;
};

type ThemeActions = {
  initTheme: () => void;
  setTheme: (t: ThemeMode) => void;
};

export const useThemeStore = create<ThemeStates & ThemeActions>()(
  persist(
    (set, get) => ({
      // States
      theme: 'system',

      // Actions
      initTheme: () => {
        applyTheme(get().theme);
        setupSystemListener(get().theme, get);
      },
      setTheme: (t) => {
        set({ theme: t });
        applyTheme(t);
        setupSystemListener(t, get);
      },
    }),
    {
      name: STORAGE_KEYS.THEME,
      partialize: (s) => ({ theme: s.theme }),
    },
  ),
);
