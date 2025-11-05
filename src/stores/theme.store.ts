import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import STORAGE_KEYS from '~/constants/storageKeys';
import { applyTheme } from '~/utils/theme';

export type ThemeMode = 'light' | 'dark' | 'system';

type ThemeState = {
  theme: ThemeMode;
  setTheme: (t: ThemeMode) => void;
  init: () => void;
};

export const useThemeStore = create<ThemeState>()(
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

function setupSystemListener(mode: ThemeMode, get: () => ThemeState) {
  const media = window.matchMedia?.('(prefers-color-scheme: dark)');
  if (!media || !media.addEventListener) return;

  media.removeEventListener('change', onSystemChange);
  if (mode === 'system') {
    media.addEventListener('change', onSystemChange);
  }

  function onSystemChange() {
    const cur = get().theme;
    if (cur === 'system') {
      applyTheme('system');
    }
  }
}
