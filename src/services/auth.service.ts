import { apiMain } from '~/lib/api';
import type { LoginRequest, LoginResponse, LogoutResponse, RefreshResponse } from '~/types/auth';

const authServices = {
  login: async (payload: LoginRequest) => {
    return apiMain.post<LoginResponse>('/auth/login', payload);
  },
  refresh: async () => {
    return apiMain.post<RefreshResponse>('/auth/refresh');
  },
  logout: async () => {
    return apiMain.post<LogoutResponse>('/auth/logout');
  },
};

export default authServices;
