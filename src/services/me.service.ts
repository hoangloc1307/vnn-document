import { apiMain } from '~/lib/api';
import type { GetMeResponse } from '~/types/me';

const meServices = {
  getMe: async () => {
    return apiMain.get<GetMeResponse>('/me');
  },
};

export default meServices;
