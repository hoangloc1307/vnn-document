import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog';

export default function SelectFile({ children }: { children: React.ReactNode }) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    // onFiles(acceptedFiles);
    console.log(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
    onDrop,
    multiple: true,
  });

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select File</DialogTitle>
          <DialogDescription>Select a file to upload</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
