import { useQueryClient } from '@tanstack/react-query';
import { BellIcon, InfoIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert';
import { Button } from '~/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import {
  NOTIFICATION_QUERY_KEY,
  useGetAllNotifications,
  useGetUnreadCount,
} from '~/hooks/queries/useNotifications';
import { useSocketEvent } from '~/hooks/useSocketEvent';

export function Notification() {
  const { t } = useTranslation(['common']);
  const queryClient = useQueryClient();
  const { data: notifications } = useGetAllNotifications();
  const { data: unreadCount } = useGetUnreadCount();

  useSocketEvent('notification:new', () => {
    queryClient.invalidateQueries({ queryKey: [NOTIFICATION_QUERY_KEY.ALL] });
  });

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
        {notifications.length === 0 ? (
          <Alert className='w-sm'>
            <InfoIcon />
            <AlertTitle>No notifications</AlertTitle>
            <AlertDescription>You have no notifications</AlertDescription>
          </Alert>
        ) : (
          <>
            {notifications.map((notification) => (
              <DropdownMenuItem key={notification.id} className='w-sm'>
                <Alert>
                  <InfoIcon />
                  <AlertTitle>{notification.title}</AlertTitle>
                  <AlertDescription>{notification.content}</AlertDescription>
                </Alert>
              </DropdownMenuItem>
            ))}
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
