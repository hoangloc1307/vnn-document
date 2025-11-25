import { apiMain } from '~/lib/api';
import { type LoginRequest, type LoginResponse, type RefreshResponse } from '~/types/auth';

const authServices = {
  login: async (payload: LoginRequest) => {
    return apiMain.post<LoginResponse>('/auth/login', payload);
  },
  refresh: async () => {
    return apiMain.post<RefreshResponse>('/auth/refresh');
  },
};

export default authServices;
