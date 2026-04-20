import { useQueryClient } from '@tanstack/react-query';
import { Trans } from 'react-i18next';
import { toast } from 'sonner';
import { ITEM_QUERY_KEY } from '~/hooks/queries/useItems';
import { useAppMutation } from '~/hooks/useAppMutaion';
import itemServices from '~/services/item.service';

export function useCreateItem() {
  const queryClient = useQueryClient();
  return useAppMutation({
    mutationFn: itemServices.createItem,
    onSuccess: (data) => {
      toast.success(`Create item ${data.data} successfully!`);
      queryClient.invalidateQueries({ queryKey: [ITEM_QUERY_KEY.ALL] });
    },
  });
}

export function useUpdateItem() {
  const queryClient = useQueryClient();
  return useAppMutation({
    mutationFn: itemServices.updateItem,
    onSuccess: (data) => {
      toast.success(`Update item ${data.data} successfully!`);
      queryClient.invalidateQueries({ queryKey: [ITEM_QUERY_KEY.ALL] });
    },
  });
}

export function useDeleteItem() {
  const queryClient = useQueryClient();
  return useAppMutation({
    mutationFn: itemServices.deleteItem,
    onSuccess: (_, itemCode) => {
      toast.success(
        <Trans
          i18nKey='item:delete_success'
          values={{ code: itemCode }}
          components={{
            highlight: <span className='font-extrabold' />,
          }}
        />,
      );
      queryClient.invalidateQueries({ queryKey: [ITEM_QUERY_KEY.ALL] });
    },
  });
}

export function useImportItem() {
  return useAppMutation({
    mutationFn: itemServices.importItem,
    onSuccess: () => {
      toast.success(`Import item successfully, please wait for processing!`);
    },
  });
}
