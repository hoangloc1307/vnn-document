import { useQuery } from '@tanstack/react-query';
import meServices from '~/services/me.service';

export function useGetMe(options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ['me'],
    queryFn: meServices.getMe,
    staleTime: Infinity,
    gcTime: Infinity,
    ...options,
  });
}
