import { useQuery } from '@tanstack/react-query';
import authServices from '~/services/auth.service';

export function useRefresh(enabled: boolean) {
  return useQuery({
    queryKey: ['refresh'],
    queryFn: authServices.refresh,
    enabled,
  });
}
