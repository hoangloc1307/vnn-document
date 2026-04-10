import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import authServices from '~/services/auth.service';
import { useAuthStore } from '~/stores/auth.store';
import type { ApiErrorResponse } from '~/types/api';

export function useLogin() {
  const setAuth = useAuthStore((s) => s.setAuth);

  return useMutation({
    mutationFn: authServices.login,
    onSuccess: (data) => {
      if (data.data) {
        setAuth({ accessToken: data.data.token });
      }
    },
    onError: (error) => {
      const err = error as ApiErrorResponse;
      toast.error(err.response?.data.errorCode, {
        description: err.response?.data.message ?? 'Login failed!',
      });
    },
  });
}

export function useLogout() {
  const resetAuth = useAuthStore((s) => s.resetAuth);

  return useMutation({
    mutationFn: authServices.logout,
    onSuccess: () => {
      resetAuth();
    },
    onError: (error) => {
      const err = error as ApiErrorResponse;
      toast.error(err.response?.data.errorCode, {
        description: err.response?.data.message ?? 'Logout failed!',
      });
    },
  });
}
