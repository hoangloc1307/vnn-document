import { apiMain } from '~/lib/api';
import type {
  CreateWarehouseResponse,
  GetWarehousesResponse,
  UpdateWarehouseResponse,
} from '~/types/warehouse';
import type { WarehouseFormValues } from '~/validations/warehouse.validation';

const WAREHOUSE_ENDPOINT = '/warehouses';

const warehouseServices = {
  getAllWarehouses: async () => {
    const response = await apiMain.get<GetWarehousesResponse>(WAREHOUSE_ENDPOINT);
    return response.data;
  },
  createWarehouse: async (data: WarehouseFormValues) => {
    const response = await apiMain.post<CreateWarehouseResponse>(WAREHOUSE_ENDPOINT, data);
    return response;
  },
  updateWarehouse: async (data: WarehouseFormValues) => {
    const response = await apiMain.put<UpdateWarehouseResponse>(
      `${WAREHOUSE_ENDPOINT}/${data.code}`,
      data,
    );
    return response;
  },
  deleteWarehouse: async (code: string) => {
    const response = await apiMain.delete<void>(`${WAREHOUSE_ENDPOINT}/${code}`);
    return response;
  },
};

export default warehouseServices;
