import { apiMain } from '~/lib/api';
import type { CreateItemResponse, GetItemsResponse } from '~/types/item';
import type { CreateItemFormValues } from '~/validations/item.validation';

const itemServices = {
  getAllItems: async () => {
    const response = await apiMain.get<GetItemsResponse>(`/items`);
    return response.data;
  },
  createItem: async (data: CreateItemFormValues) => {
    const itemCode = await apiMain.post<CreateItemResponse>(`/items`, data);
    return itemCode;
  },
};

export default itemServices;
