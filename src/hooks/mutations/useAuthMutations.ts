import { useAppMutation } from '~/hooks/useAppMutaion';
import authServices from '~/services/auth.service';
import { useAuthStore } from '~/stores/auth.store';

export function useLogin() {
  const setAuth = useAuthStore((s) => s.setAuth);

  return useAppMutation({
    mutationFn: authServices.login,
    onSuccess: (data) => {
      if (data.data) {
        setAuth({ accessToken: data.data.token });
      }
    },
  });
}

export function useLogout() {
  const resetAuth = useAuthStore((s) => s.resetAuth);

  return useAppMutation({
    mutationFn: authServices.logout,
    onSuccess: () => {
      resetAuth();
    },
  });
}
