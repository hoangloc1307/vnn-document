import { useQuery } from '@tanstack/react-query';
import zoneServices from '~/services/zone.service';

export const ZONE_QUERY_KEY = {
  ALL: 'zones',
};

export function useGetAllZones() {
  const { data, ...rest } = useQuery({
    queryKey: [ZONE_QUERY_KEY.ALL],
    queryFn: zoneServices.getAllZones,
  });

  return {
    data: data ?? [],
    ...rest,
  };
}
