import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  return useAppMutation({
    mutationFn: ({ token, type }: { token: string; type: string }) =>
      importServices.commitImport(token, type),
    onSuccess: () => {
      toast.success(`Commit successfully!`);
      navigate('/');
    },
  });
}

export function useCancelImport() {
  const navigate = useNavigate();

  return useAppMutation({
    mutationFn: ({ token, type }: { token: string; type: string }) =>
      importServices.cancelImport(token, type),
    onSuccess: () => {
      toast.success(`Cancel successfully!`);
      navigate('/');
    },
  });
}
