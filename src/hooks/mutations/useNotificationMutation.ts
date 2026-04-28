import { useQueryClient } from '@tanstack/react-query';
import { NOTIFICATION_QUERY_KEY } from '~/hooks/queries/useNotifications';
import { useAppMutation } from '~/hooks/useAppMutaion';
import notificationServices from '~/services/notification.service';

export function useMarkAsRead() {
  const queryClient = useQueryClient();

  return useAppMutation({
    mutationFn: notificationServices.markAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: NOTIFICATION_QUERY_KEY.ALL });
    },
  });
}
