import type { AxiosError } from 'axios';

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  errorCode?: string;
  metadata?: Record<string, string>;
  pagination?: {
    page: number;
    limit?: number;
    totalItems: number;
    totalPages: number;
  };
}

export type ApiErrorResponse = AxiosError<{
  success: boolean;
  message: string;
  errorCode: string;
  metadata?: Record<string, string>;
}>;
