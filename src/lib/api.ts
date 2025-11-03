import { Http } from '~/lib/http';
import CONFIG from '~/config/app';
import { useAuthStore } from '~/stores/auth.store';

export const apiMain = new Http(
  {
    baseURL: CONFIG.BASE_API_URL,
  },
  (ins) => {
    ins.interceptors.request.use((cfg) => {
      const token = useAuthStore.getState().accessToken;
      if (token) {
        cfg.headers.Authorization = `Bearer ${token}`;
      }
      return cfg;
    });
  },
);

// export const apiReport = new Http({
//   baseURL: CONFIG.REPORT_API_URL,
// });
