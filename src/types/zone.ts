import type { ApiResponse } from './api';

export type Zone = {
  warehouseCode: string;
  code: string;
  name: string;
  note: string | null;
  isActive: boolean;
  createdAt: string;
  createdBy: string;
  updatedAt: string | null;
  updatedBy: string | null;
  warehouse: {
    code: string;
    name: string;
  };
};

export type GetZonesResponse = ApiResponse<Zone[]>;

export type CreateZoneResponse = ApiResponse<string>;

export type UpdateZoneResponse = ApiResponse<string>;
