import { ArrowLeftIcon, EyeOffIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button } from '~/components/ui/button';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '~/components/ui/empty';

export default function ImportNotFound() {
  const navigate = useNavigate();
  const { t } = useTranslation(['import']);

  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant='icon'>
          <EyeOffIcon />
        </EmptyMedia>
        <EmptyTitle>{t('import:noImportAvailable')}</EmptyTitle>
        <EmptyDescription className='max-w-xs text-pretty'>
          {t('import:importJobNotFoundOrExpired')}
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant='outline' onClick={() => navigate('/')}>
          <ArrowLeftIcon />
          {t('import:backToHome')}
        </Button>
      </EmptyContent>
    </Empty>
  );
}
