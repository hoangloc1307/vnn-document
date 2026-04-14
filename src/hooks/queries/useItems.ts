import { useQuery } from '@tanstack/react-query';
import itemServices from '~/services/item.service';

export const ITEM_QUERY_KEY = {
  ALL: 'items',
};

export function useGetAllItems() {
  const { data, ...rest } = useQuery({
    queryKey: [ITEM_QUERY_KEY.ALL],
    queryFn: itemServices.getAllItems,
  });

  return {
    data: data ?? [],
    ...rest,
  };
}
