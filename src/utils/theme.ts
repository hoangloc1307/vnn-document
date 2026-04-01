import type { ThemeMode } from '~/stores/theme.store';

export function isDarkMode() {
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export function applyTheme(mode: ThemeMode) {
  const root = document.documentElement;
  root.classList.remove('light', 'dark');
  const effective = mode === 'system' ? (isDarkMode() ? 'dark' : 'light') : mode;
  root.classList.add(effective);
}

export function setupSystemListener(mode: ThemeMode, get: () => { theme: ThemeMode }) {
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
