import { apiMain } from '~/lib/api';

const authServices = {
  login: (payload: { username: string; password: string }) =>
    apiMain.post<{
      success: boolean;
      message: string;
      data: {
        user: {
          username: string;
          name: string;
          email: string;
        };
        tokens: {
          accessToken: string;
        };
      };
    }>('/auth/login', payload),
};

export default authServices;
