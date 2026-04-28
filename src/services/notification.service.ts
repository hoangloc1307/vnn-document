import { apiMain } from '~/lib/api';
import type {
  GetNotificationResponse,
  GetUnreadCountResponse,
  MarkAsReadResponse,
} from '~/types/notification';

const NOTIFICATION_ENDPOINT = '/notifications';

const notificationServices = {
  getAllNotifications: async () => {
    const response = await apiMain.get<GetNotificationResponse>(`${NOTIFICATION_ENDPOINT}`);
    return response.data;
  },
  getUnreadCount: async () => {
    const response = await apiMain.get<GetUnreadCountResponse>(
      `${NOTIFICATION_ENDPOINT}/unread-count`,
    );
    return response.data;
  },
  markAsRead: async (id: string) => {
    const response = await apiMain.patch<MarkAsReadResponse>(`${NOTIFICATION_ENDPOINT}/${id}/read`);
    return response;
  },
};

export default notificationServices;
