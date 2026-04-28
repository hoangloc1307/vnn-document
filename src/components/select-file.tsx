import { UploadIcon, XIcon } from 'lucide-react';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useTranslation } from 'react-i18next';
import { Button } from '~/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog';
import { IMPORT_ACCEPT } from '~/constants/fileType';
import { cn } from '~/lib/utils';
import { formatFileSize } from '~/utils/format';

interface SelectFileProps {
  children: React.ReactNode;
  onSelectedFiles: (files: File[]) => void;
  multiple?: boolean;
}

export default function SelectFile({
  children,
  onSelectedFiles,
  multiple = false,
}: SelectFileProps) {
  const { t } = useTranslation(['common']);
  const [files, setFiles] = useState<File[]>([]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      setFiles(acceptedFiles);
    },
    multiple,
    maxSize: 1024 * 1024 * 10, // 10MB
    accept: IMPORT_ACCEPT,
  });

  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open) {
          setFiles([]);
        }
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('common:select_file')}</DialogTitle>
          <DialogDescription>{t('common:select_file_description')}</DialogDescription>
        </DialogHeader>
        <div className='w-full'>
          <div
            {...getRootProps()}
            className={cn(
              'cursor-pointer rounded-xl border-2 border-dashed p-6 text-center transition',
              'hover:bg-muted/50',
              isDragActive && 'border-primary bg-primary/5',
            )}
          >
            <input {...getInputProps()} />

            <div className='flex flex-col items-center gap-2'>
              <UploadIcon className='text-muted-foreground h-8 w-8' />

              {isDragActive ? (
                <p className='text-primary text-sm'>{t('common:drop_file_here')}</p>
              ) : (
                <>
                  <p className='text-sm'>{t('common:drag_and_drop_file')}</p>
                  {multiple && (
                    <p className='text-muted-foreground text-xs'>
                      {t('common:drag_and_drop_file_description')}
                    </p>
                  )}
                </>
              )}
            </div>
          </div>

          {/* preview list */}
          {files.length > 0 && (
            <div className='mt-2 flex max-h-60 flex-col gap-1 overflow-y-auto'>
              {files.map((file) => (
                <div
                  key={file.name}
                  className='flex items-center justify-between rounded-md border px-3 py-2 text-sm'
                >
                  <div className='flex flex-col gap-0.5'>
                    <div className='font-medium'>{file.name}</div>
                    <div className='text-muted-foreground text-xs'>
                      {formatFileSize(file.size, 2)}
                    </div>
                  </div>
                  <Button
                    variant={'ghost'}
                    size={'icon'}
                    onClick={() => setFiles(files.filter((f) => f.name !== file.name))}
                  >
                    <XIcon />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={'outline'}>{t('common:cancel')}</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              onClick={() => {
                onSelectedFiles(files);
              }}
              disabled={files.length === 0}
            >
              {t('common:save')}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
