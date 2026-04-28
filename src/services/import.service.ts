import { apiMain } from '~/lib/api';
import type {
  CommitImportResponse,
  GetImportByCodeResponse,
  UploadImportResponse,
} from '~/types/import';

const IMPORT_ENDPOINT = '/import';

const importServices = {
  importItem: async (data: FormData) => {
    const response = await apiMain.post<UploadImportResponse>(`${IMPORT_ENDPOINT}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  getImportByCode: async (code: string) => {
    const response = await apiMain.get<GetImportByCodeResponse>(`${IMPORT_ENDPOINT}/${code}`);
    return response.data;
  },
  commitImport: async (code: string, type: string) => {
    const response = await apiMain.put<CommitImportResponse>(`${IMPORT_ENDPOINT}/${code}/commit`, {
      type,
    });
    return response.data;
  },
  cancelImport: async (code: string, type: string) => {
    const response = await apiMain.put<CommitImportResponse>(`${IMPORT_ENDPOINT}/${code}/cancel`, {
      type,
    });
    return response.data;
  },
};

export default importServices;
