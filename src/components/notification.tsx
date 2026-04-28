import { IconBell } from '@tabler/icons-react';
import { useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { BellIcon, InfoIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert';
import { Button } from '~/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '~/components/ui/empty';
import { Separator } from '~/components/ui/separator';
import PATHS from '~/constants/paths';
import { useMarkAsRead } from '~/hooks/mutations/useNotificationMutation';
import {
  NOTIFICATION_QUERY_KEY,
  useGetAllNotifications,
  useGetUnreadCount,
} from '~/hooks/queries/useNotifications';
import { useSocketEvent } from '~/hooks/useSocketEvent';
import type { Notification } from '~/types/notification';

export function Notification() {
  const navigate = useNavigate();
  const { t } = useTranslation(['common']);
  const queryClient = useQueryClient();
  const { data: notifications } = useGetAllNotifications();
  const { data: unreadCount } = useGetUnreadCount();
  const markAsReadMutation = useMarkAsRead();

  useSocketEvent('notification:new', () => {
    queryClient.invalidateQueries({ queryKey: NOTIFICATION_QUERY_KEY.ALL });
  });

  const handleNotificationClick = (notification: Notification) => () => {
    markAsReadMutation.mutate(notification.id);
    navigate(`${PATHS.IMPORT}/${notification.entityId}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size={'icon-sm'}
          variant={'ghost'}
          className='relative'
          title={t('common:notification')}
        >
          <BellIcon />
          {unreadCount > 0 && (
            <span className='absolute top-0 left-0 flex size-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white'>
              {unreadCount >= 9 ? '9+' : unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <div className='w-xs px-1 py-2'>
          <div className='text-center font-semibold'>{t('common:notification')}</div>
          <Separator className='my-1' />
          <div className='max-h-[300px] overflow-y-auto'>
            {notifications.length === 0 ? (
              <Empty className='bg-muted/30 h-full'>
                <EmptyHeader>
                  <EmptyMedia variant='icon'>
                    <IconBell />
                  </EmptyMedia>
                  <EmptyTitle>{t('common:no_notifications')}</EmptyTitle>
                  <EmptyDescription className='max-w-xs text-pretty'>
                    {t('common:no_notifications_description')}
                  </EmptyDescription>
                </EmptyHeader>
              </Empty>
            ) : (
              <>
                {notifications.map((notification) => (
                  <DropdownMenuItem
                    key={notification.id}
                    onClick={handleNotificationClick(notification)}
                  >
                    <Alert className={notification.isRead ? '' : 'bg-primary-foreground'}>
                      <InfoIcon />
                      <div className='flex items-center justify-between'>
                        <AlertTitle>{notification.title}</AlertTitle>
                        <p className='text-xs'>
                          {format(new Date(notification.createdAt), 'HH:mm dd/MM/yyyy')}
                        </p>
                      </div>
                      <AlertDescription>{notification.content}</AlertDescription>
                    </Alert>
                  </DropdownMenuItem>
                ))}
              </>
            )}
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
