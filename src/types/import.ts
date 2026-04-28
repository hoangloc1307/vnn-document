import type { ApiResponse } from './api';

export type UploadImportResponse = ApiResponse<{
  token: string;
  status: string;
  expiredAt: string;
}>;

type ErrorData = {
  field: string;
  message: string;
};

type ImportJobRow = {
  id: string;
  rowNumber: number;
  rowKey: string;
  action: string;
  rawData: unknown;
  normalizedData: unknown | null;
  diffData: Record<string, { from: unknown; to: unknown }> | null;
  errorData: ErrorData[];
};

type ImportJob = {
  id: string;
  token: string;
  type: string;
  status: string;
  fileName: string;
  totalRows: number;
  createdRows: number;
  updatedRows: number;
  skippedRows: number;
  errorRows: number;
  expiredAt: string;
  importJobRows: ImportJobRow[];
};

export type GetImportByCodeResponse = ApiResponse<ImportJob>;

export type CommitImportResponse = ApiResponse<null>;
