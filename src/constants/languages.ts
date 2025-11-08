import flagVI from '~/assets/images/flags/vi.png';
import flagEN from '~/assets/images/flags/en.png';
import flagJP from '~/assets/images/flags/jp.png';

export const LANGUAGES = {
  vi: { label: 'Tiếng Việt', flag: flagVI },
  en: { label: 'English', flag: flagEN },
  jp: { label: '日本語', flag: flagJP },
} as const;
