import { useTranslation } from 'react-i18next';
import { ModeToggle } from '~/components/mode-toggle';

export default function DashboardPage() {
  const { t, i18n } = useTranslation();
  return (
    <div>
      <h1>{t('hi')}</h1>
      <div className='space-x-2'>
        <button onClick={() => i18n.changeLanguage('vi')}>VI</button>
        <button onClick={() => i18n.changeLanguage('en')}>EN</button>
      </div>
      <ModeToggle />
    </div>
  );
}
