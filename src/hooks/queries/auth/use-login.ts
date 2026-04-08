import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { toast } from 'sonner';
import authServices from '~/services/auth.service';
import { useAuthStore } from '~/stores/auth.store';

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
      const err = error as AxiosError<{ message: string; errorCode: string }>;
      toast.error(err.response?.data.errorCode, {
        description: err.response?.data.message ?? 'Đăng nhập thất bại!',
      });
    },
  });
}
