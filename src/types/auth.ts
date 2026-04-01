import type { ApiResponse } from '~/types/api';

export interface LoginRequest {
  username: string;
  password: string;
}

export type LoginResponse = ApiResponse<{
  user: {
    username: string;
    name: string;
    email: string;
  };
  accessToken: string;
}>;

export type RefreshResponse = ApiResponse<string>;
