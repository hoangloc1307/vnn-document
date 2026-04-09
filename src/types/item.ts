import type { ApiResponse } from './api';

export type Item = {
  itemCode: string;
  productCode: string;
  name: string;
  unit: string;
  baseUnit: string;
  conversionFactor: string;
  deliveryOnBaseUnit: boolean;
  trackingType: 'LABEL' | 'QUANTITY';
  note: string | null;
  isActive: boolean;
  createdAt: string;
  createdBy: string;
  updatedAt: string | null;
  updatedBy: string | null;
};

export type GetItemsResponse = ApiResponse<Item[]>;

export type CreateItemResponse = ApiResponse<string>;
