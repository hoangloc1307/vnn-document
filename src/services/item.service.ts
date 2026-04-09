import { apiMain } from '~/lib/api';
import type { GetItemsResponse } from '~/types/item';

const itemServices = {
  getAllItems: async () => {
    const response = await apiMain.get<GetItemsResponse>(`/items`);
    return response.data;
  },
};

export default itemServices;
