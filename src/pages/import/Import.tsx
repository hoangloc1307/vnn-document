import { CheckIcon, Loader2Icon, XIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Button } from '~/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table';
import { useGetImportByCode } from '~/hooks/queries/useImport';
import { cn } from '~/lib/utils';
import ImportNotFound from '~/pages/import/ImportNotFound';

export default function ImportPage() {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation(['common', 'import']);

  const { data: importJob, isError, isFetching } = useGetImportByCode(id ?? '');

  if (isFetching) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <Loader2Icon className='h-8 w-8 animate-spin' />
      </div>
    );
  }

  if (isError) {
    return <ImportNotFound />;
  }

  return (
    <section className='flex h-full flex-col gap-5'>
      <div className='flex items-baseline justify-between gap-2'>
        <div>
          <h2 className='text-2xl font-bold tracking-tight'>{t('import:importCommitment')}</h2>
          <p className='text-muted-foreground'>{t('import:reviewAndConfirm')}</p>
        </div>

        <div className='flex flex-wrap justify-end gap-2'>
          <Button size={'sm'} variant={'outline'}>
            <XIcon /> {t('common:cancel')}
          </Button>

          <Button size={'sm'}>
            <CheckIcon /> {t('common:confirm')}
          </Button>
        </div>
      </div>

      <div className='space-y-2'>
        <h3 className='font-semibold'>{t('import:importFileInfo')}</h3>
        <TableContainer className='h-auto w-full overflow-auto'>
          <Table>
            <TableHeader className='bg-accent'>
              <TableRow>
                <TableHead>{t('import:code')}</TableHead>
                <TableHead>{t('import:type')}</TableHead>
                <TableHead>{t('import:status')}</TableHead>
                <TableHead>{t('import:filename')}</TableHead>
                <TableHead>{t('import:totalRows')}</TableHead>
                <TableHead>{t('import:createdRows')}</TableHead>
                <TableHead>{t('import:updatedRows')}</TableHead>
                <TableHead>{t('import:skippedRows')}</TableHead>
                <TableHead>{t('import:errorRows')}</TableHead>
                <TableHead>{t('import:expiredDate')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>{importJob?.token}</TableCell>
                <TableCell>{importJob?.type}</TableCell>
                <TableCell>{importJob?.status}</TableCell>
                <TableCell>{importJob?.fileName}</TableCell>
                <TableCell>{importJob?.totalRows}</TableCell>
                <TableCell>{importJob?.createdRows}</TableCell>
                <TableCell>{importJob?.updatedRows}</TableCell>
                <TableCell>{importJob?.skippedRows}</TableCell>
                <TableCell>{importJob?.errorRows}</TableCell>
                <TableCell>{importJob?.expiredAt}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <div className='flex flex-1 flex-col space-y-2 overflow-auto'>
        <h3 className='font-semibold'>{t('import:importRowInfo')}</h3>
        <div className='flex-1 overflow-auto'>
          <TableContainer className='w-full'>
            <Table className='table-fixed'>
              <TableHeader className='bg-accent sticky top-0 shadow-sm'>
                <TableRow>
                  <TableHead>{t('import:rowNumber')}</TableHead>
                  <TableHead>{t('import:action')}</TableHead>
                  <TableHead>{t('import:normalizedData')}</TableHead>
                  <TableHead>{t('import:diffData')}</TableHead>
                  <TableHead>{t('import:errorData')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {importJob?.importJobRows?.map((row) => (
                  <TableRow
                    key={row.id}
                    className={cn(
                      'hover:bg-primary/10',
                      row.action === 'ERROR' && 'bg-red-50',
                      row.action === 'CREATE' && 'bg-green-50',
                      row.action === 'UPDATE' && 'bg-yellow-50',
                      row.action === 'SKIP' && 'bg-gray-50',
                    )}
                  >
                    <TableCell>{row.rowNumber}</TableCell>
                    <TableCell>{row.action}</TableCell>
                    <TableCell className='text-xs'>
                      {row.action === 'CREATE' &&
                        Object.entries(row.normalizedData ?? {}).map(([key, value]) => (
                          <p key={key}>
                            <strong>{key}:</strong> {value?.toString()}
                          </p>
                        ))}
                    </TableCell>
                    <TableCell className='text-xs'>
                      {Object.entries(row.diffData ?? {}).map(([key, value]) => (
                        <p key={key}>
                          <strong>{key}:</strong> {`${String(value?.from)} -> ${String(value?.to)}`}
                        </p>
                      ))}
                    </TableCell>
                    <TableCell className='text-xs'>
                      {row.errorData?.map((error, index) => (
                        <p key={index} className='text-wrap'>
                          <strong>{error.field}:</strong> {error.message}
                        </p>
                      ))}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </section>
  );
}
