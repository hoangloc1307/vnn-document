import { useMutation, type UseMutationOptions } from '@tanstack/react-query';
import { toast } from 'sonner';
import type { ApiErrorResponse } from '~/types/api';

export function useAppMutation<TData, TVariables>(
  options: UseMutationOptions<TData, ApiErrorResponse, TVariables>,
) {
  return useMutation({
    ...options,
    onError: (error, variables, onMutateResult, context) => {
      const err = error as ApiErrorResponse;

      toast.error(err.response?.data?.errorCode ?? 'Error', {
        description: err.response?.data?.message ?? 'Something went wrong',
      });

      options.onError?.(error, variables, onMutateResult, context);
    },
  });
}
