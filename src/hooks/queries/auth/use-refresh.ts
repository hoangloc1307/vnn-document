import { useMutation } from '@tanstack/react-query';
import authServices from '~/services/auth.service';
import { useAuthStore } from '~/stores/auth.store';

export function useRefresh() {
  const setAuth = useAuthStore((s) => s.setAuth);
  const resetAuth = useAuthStore((s) => s.resetAuth);

  return useMutation({
    mutationFn: authServices.refresh,
    onSuccess: (data) => {
      if (data.data) {
        setAuth({ accessToken: data.data.accessToken });
      }
    },
    onError: () => {
      resetAuth();
    },
  });
}
