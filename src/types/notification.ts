import type { ApiResponse } from '~/types/api';

export type Notification = {
  id: string;
  userId: string;
  type: string;
  title: string;
  content: string;
  entityType: string;
  entityId: string;
  isRead: boolean;
  createdAt: string;
};

export type GetNotificationResponse = ApiResponse<Notification[]>;

export type GetUnreadCountResponse = ApiResponse<{ count: number }>;

export type MarkAsReadResponse = ApiResponse<void>;
