import { apiMain } from '~/lib/api';
import type {
  CreateItemResponse,
  GetItemsResponse,
  ImportItemResponse,
  UpdateItemResponse,
} from '~/types/item';
import type { ItemFormValues } from '~/validations/item.validation';

const ITEM_ENDPOINT = '/items';

const itemServices = {
  getAllItems: async () => {
    const response = await apiMain.get<GetItemsResponse>(ITEM_ENDPOINT);
    return response.data;
  },
  createItem: async (data: ItemFormValues) => {
    const response = await apiMain.post<CreateItemResponse>(ITEM_ENDPOINT, data);
    return response;
  },
  updateItem: async (data: ItemFormValues) => {
    const response = await apiMain.put<UpdateItemResponse>(
      `${ITEM_ENDPOINT}/${data.itemCode}`,
      data,
    );
    return response;
  },
  deleteItem: async (itemCode: string) => {
    const response = await apiMain.delete<void>(`${ITEM_ENDPOINT}/${itemCode}`);
    return response;
  },
  importItem: async (data: FormData) => {
    const response = await apiMain.post<ImportItemResponse>(`${ITEM_ENDPOINT}/import`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};

export default itemServices;
