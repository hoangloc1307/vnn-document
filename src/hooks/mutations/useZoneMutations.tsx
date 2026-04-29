import { useQueryClient } from '@tanstack/react-query';
import { Trans } from 'react-i18next';
import { toast } from 'sonner';
import { ZONE_QUERY_KEY } from '~/hooks/queries/useZones';
import { useAppMutation } from '~/hooks/useAppMutaion';
import zoneServices from '~/services/zone.service';

export function useCreateZone() {
  const queryClient = useQueryClient();
  return useAppMutation({
    mutationFn: zoneServices.createZone,
    onSuccess: (data) => {
      toast.success(
        <Trans
          i18nKey='zone:create_success'
          values={{ code: data.data }}
          components={{
            highlight: <span className='font-extrabold' />,
          }}
        />,
      );
      queryClient.invalidateQueries({ queryKey: [ZONE_QUERY_KEY.ALL] });
    },
  });
}

export function useUpdateZone() {
  const queryClient = useQueryClient();
  return useAppMutation({
    mutationFn: zoneServices.updateZone,
    onSuccess: (data) => {
      toast.success(
        <Trans
          i18nKey='zone:update_success'
          values={{ code: data.data }}
          components={{
            highlight: <span className='font-extrabold' />,
          }}
        />,
      );
      queryClient.invalidateQueries({ queryKey: [ZONE_QUERY_KEY.ALL] });
    },
  });
}

export function useDeleteZone() {
  const queryClient = useQueryClient();
  return useAppMutation({
    mutationFn: zoneServices.deleteZone,
    onSuccess: (_, zoneCode) => {
      toast.success(
        <Trans
          i18nKey='zone:delete_success'
          values={{ code: zoneCode }}
          components={{
            highlight: <span className='font-extrabold' />,
          }}
        />,
      );
      queryClient.invalidateQueries({ queryKey: [ZONE_QUERY_KEY.ALL] });
    },
  });
}
