import { toast } from 'sonner';
import { useAppMutation } from '~/hooks/useAppMutaion';
import importServices from '~/services/import.service';

export function useImport() {
  return useAppMutation({
    mutationFn: importServices.importItem,
    onSuccess: () => {
      toast.success(`Import successfully, please wait for processing!`);
    },
  });
}
