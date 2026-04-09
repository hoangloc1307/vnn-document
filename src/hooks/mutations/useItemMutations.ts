import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { toast } from 'sonner';
import itemServices from '~/services/item.service';

export function useCreateItem() {
  return useMutation({
    mutationFn: itemServices.createItem,
    onSuccess: (data) => {
      toast.success(`Create item ${data.data} successfully!`);
    },
    onError: (error) => {
      const err = error as AxiosError<{ message: string; errorCode: string }>;
      toast.error(err.response?.data.errorCode, {
        description: err.response?.data.message ?? 'Failed to create item',
      });
    },
  });
}

// export function useUpdateItem() {
//   return useMutation({
//     mutationFn: itemServices.updateItem,
//   });
// }

// export function useDeleteItem() {
//   return useMutation({
//     mutationFn: itemServices.deleteItem,
//   });
// }
