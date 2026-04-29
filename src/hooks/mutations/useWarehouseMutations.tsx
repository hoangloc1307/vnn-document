import { useQueryClient } from '@tanstack/react-query';
import { Trans } from 'react-i18next';
import { toast } from 'sonner';
import { WAREHOUSE_QUERY_KEY } from '~/hooks/queries/useWarehouses';
import { useAppMutation } from '~/hooks/useAppMutaion';
import warehouseServices from '~/services/warehouse.service';

export function useCreateWarehouse() {
  const queryClient = useQueryClient();
  return useAppMutation({
    mutationFn: warehouseServices.createWarehouse,
    onSuccess: (data) => {
      toast.success(
        <Trans
          i18nKey='warehouse:create_success'
          values={{ code: data.data }}
          components={{
            highlight: <span className='font-extrabold' />,
          }}
        />,
      );
      queryClient.invalidateQueries({ queryKey: [WAREHOUSE_QUERY_KEY.ALL] });
    },
  });
}

export function useUpdateWarehouse() {
  const queryClient = useQueryClient();
  return useAppMutation({
    mutationFn: warehouseServices.updateWarehouse,
    onSuccess: (data) => {
      toast.success(
        <Trans
          i18nKey='warehouse:update_success'
          values={{ code: data.data }}
          components={{
            highlight: <span className='font-extrabold' />,
          }}
        />,
      );
      queryClient.invalidateQueries({ queryKey: [WAREHOUSE_QUERY_KEY.ALL] });
    },
  });
}

export function useDeleteWarehouse() {
  const queryClient = useQueryClient();
  return useAppMutation({
    mutationFn: warehouseServices.deleteWarehouse,
    onSuccess: (_, warehouseCode) => {
      toast.success(
        <Trans
          i18nKey='warehouse:delete_success'
          values={{ code: warehouseCode }}
          components={{
            highlight: <span className='font-extrabold' />,
          }}
        />,
      );
      queryClient.invalidateQueries({ queryKey: [WAREHOUSE_QUERY_KEY.ALL] });
    },
  });
}
