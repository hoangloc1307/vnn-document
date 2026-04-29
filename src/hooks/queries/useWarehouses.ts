import { useQuery } from '@tanstack/react-query';
import warehouseServices from '~/services/warehouse.service';

export const WAREHOUSE_QUERY_KEY = {
  ALL: 'warehouses',
};

export function useGetAllWarehouses() {
  const { data, ...rest } = useQuery({
    queryKey: [WAREHOUSE_QUERY_KEY.ALL],
    queryFn: warehouseServices.getAllWarehouses,
  });

  return {
    data: data ?? [],
    ...rest,
  };
}
