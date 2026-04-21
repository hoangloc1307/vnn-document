import { useQuery } from '@tanstack/react-query';
import notificationServices from '~/services/notification.service';

const base = ['notifications'] as const;

export const NOTIFICATION_QUERY_KEY = {
  ALL: base,
  LIST: [...base, 'list'] as const,
  UNREAD_COUNT: [...base, 'unread-count'] as const,
};

export function useGetAllNotifications() {
  const { data, ...rest } = useQuery({
    queryKey: NOTIFICATION_QUERY_KEY.LIST,
    queryFn: notificationServices.getAllNotifications,
  });

  return {
    data: data ?? [],
    ...rest,
  };
}

export function useGetUnreadCount() {
  const { data, ...rest } = useQuery({
    queryKey: NOTIFICATION_QUERY_KEY.UNREAD_COUNT,
    queryFn: notificationServices.getUnreadCount,
  });

  return {
    data: data?.count ?? 0,
    ...rest,
  };
}
