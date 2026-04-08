import type { ApiResponse } from '~/types/api';

export type User = { username: string; name: string; email: string };

export type GetMeResponse = ApiResponse<{
  user: User;
  menus: string[];
  permissions: string[];
}>;
