import type { ApiResponse } from '~/types/api';

export interface LoginRequest {
  username: string;
  password: string;
}

export type LoginResponse = ApiResponse<{
  token: string;
}>;

export type RefreshResponse = ApiResponse<{
  accessToken: string;
}>;
