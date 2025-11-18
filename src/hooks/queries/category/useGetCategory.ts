import { useQuery } from '@tanstack/react-query';
import categoryServices from '~/services/category.service';

export function useGetCategory() {
  const { data, ...rest } = useQuery({
    queryKey: ['category'],
    queryFn: categoryServices.list,
  });

  return {
    data: data?.data || [],
    ...rest,
  };
}
