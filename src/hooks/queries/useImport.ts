import { useQuery } from '@tanstack/react-query';
import importServices from '~/services/import.service';

const base = ['import'] as const;

export const IMPORT_QUERY_KEY = {
  ALL: base,
  GET_BY_CODE: (code: string) => [...base, code] as const,
};

export function useGetImportByCode(code: string) {
  const { data, ...rest } = useQuery({
    queryKey: IMPORT_QUERY_KEY.GET_BY_CODE(code),
    queryFn: () => importServices.getImportByCode(code),
    enabled: !!code,
  });

  return {
    data: data ?? null,
    ...rest,
  };
}
