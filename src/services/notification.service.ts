import { apiMain } from '~/lib/api';
import type { GetNotificationResponse, GetUnreadCountResponse } from '~/types/notification';

const notificationServices = {
  getAllNotifications: async () => {
    const response = await apiMain.get<GetNotificationResponse>('/notifications');
    return response.data;
  },
  getUnreadCount: async () => {
    const response = await apiMain.get<GetUnreadCountResponse>('/notifications/unread-count');
    return response.data;
  },
};

export default notificationServices;
