import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { Button } from '~/components/ui/button';
import authServices from '~/services/auth.service';
import { useAuthStore } from '~/stores/auth.store';

export default function DashboardPage() {
  const { t } = useTranslation();
  const accessToken = useAuthStore((s) => s.accessToken);
  const setAccessToken = useAuthStore((s) => s.setAccessToken);

  const refreshToken = async () => {
    const test = await authServices.refresh();
    console.log(test);
    setAccessToken(test.data);
  };

  return (
    <>
      <h1 className='scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance'>
        {t('hi')}
      </h1>
      <h2 className='wrap-anywhere'>{accessToken}</h2>
      <Button
        variant='outline'
        onClick={() =>
          toast.error('Event has been created', {
            description: 'Sunday, December 03, 2023 at 9:00 AM',
            action: {
              label: 'Undo',
              onClick: () => console.log('Undo'),
            },
          })
        }
      >
        Show Toast
      </Button>
      <Button variant='outline' onClick={refreshToken}>
        Refresh token
      </Button>
    </>
  );
}
