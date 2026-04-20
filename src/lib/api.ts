import type { AxiosError } from 'axios';
import { toast } from 'sonner';
import CONFIG from '~/config/app';
import { Http } from '~/lib/http';
import { useAuthStore } from '~/stores/auth.store';

export const apiMain = new Http(
  {
    baseURL: CONFIG.BASE_API_URL,
    withCredentials: true,
  },
  (ins) => {
    ins.interceptors.request.use((cfg) => {
      const token = useAuthStore.getState().accessToken;
      if (token) {
        cfg.headers.Authorization = `Bearer ${token}`;
      }
      return cfg;
    });
    ins.interceptors.response.use(
      (res) => res,
      async (error: AxiosError) => {
        const originalRequest = error.response?.config;
        const url = originalRequest?.url;

        if (error.response?.status === 401 && url !== '/auth/refresh') {
          try {
            const res = await ins.post('/auth/refresh');
            const token = res.data.data.accessToken;

            useAuthStore.getState().setAuth({ accessToken: token });

            return ins(error.response?.config);
          } catch (err) {
            useAuthStore.getState().resetAuth();
            return Promise.reject(err);
          }
        }

        return Promise.reject(error);
      },
    );
  },
);

// export const apiReport = new Http({
//   baseURL: CONFIG.REPORT_API_URL,
// });
