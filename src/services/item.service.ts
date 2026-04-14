import { apiMain } from '~/lib/api';
import type { CreateItemResponse, GetItemsResponse } from '~/types/item';
import type { CreateItemFormValues } from '~/validations/item.validation';

const ITEM_ENDPOINT = '/items';

const itemServices = {
  getAllItems: async () => {
    const response = await apiMain.get<GetItemsResponse>(ITEM_ENDPOINT);
    return response.data;
  },
  createItem: async (data: CreateItemFormValues) => {
    const itemCode = await apiMain.post<CreateItemResponse>(ITEM_ENDPOINT, data);
    return itemCode;
  },
  deleteItem: async (itemCode: string) => {
    const response = await apiMain.delete<void>(`${ITEM_ENDPOINT}/${itemCode}`);
    return response;
  },
};

export default itemServices;
