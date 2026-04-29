import type { ApiResponse } from './api';

export type Warehouse = {
  code: string;
  name: string;
  note: string | null;
  isActive: boolean;
  createdAt: string;
  createdBy: string;
  updatedAt: string | null;
  updatedBy: string | null;
};

export type GetWarehousesResponse = ApiResponse<Warehouse[]>;

export type CreateWarehouseResponse = ApiResponse<string>;

export type UpdateWarehouseResponse = ApiResponse<string>;
