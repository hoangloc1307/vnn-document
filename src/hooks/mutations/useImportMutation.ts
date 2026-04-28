import { toast } from 'sonner';
import { useAppMutation } from '~/hooks/useAppMutaion';
import importServices from '~/services/import.service';

export function useImport() {
  return useAppMutation({
    mutationFn: importServices.importItem,
    onSuccess: () => {
      toast.success(`Import successfully, please wait for validation!`);
    },
  });
}

export function useCommitImport() {
  return useAppMutation({
    mutationFn: ({ token, type }: { token: string; type: string }) =>
      importServices.commitImport(token, type),
    onSuccess: () => {
      toast.success(`Commit successfully!`);
    },
  });
}
