import { useMutation } from '@tanstack/react-query';
import authServices from '~/services/auth.service';
import { useAuthStore } from '~/stores/auth.store';

export function useLogin() {
  const setAuth = useAuthStore((s) => s.setAuth);

  return useMutation({
    mutationFn: authServices.login,
    onSuccess: (data) =>
      setAuth({ user: data.data.user, accessToken: data.data.tokens.accessToken }),
  });
}
