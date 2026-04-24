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
                <TableHead>Code</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Filename</TableHead>
                <TableHead>Total Rows</TableHead>
                <TableHead>Created Rows</TableHead>
                <TableHead>Updated Rows</TableHead>
                <TableHead>Skipped Rows</TableHead>
                <TableHead>Error Rows</TableHead>
                <TableHead>Expired Date</TableHead>
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
                  <TableHead>Row Number</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Normolized Data</TableHead>
                  <TableHead>Diff Data</TableHead>
                  <TableHead>Error Data</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {importJob?.importJobRows?.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.rowNumber}</TableCell>
                    <TableCell>{row.action}</TableCell>
                    <TableCell>
                      {Object.entries(row.normalizedData ?? {}).map(([key, value]) => (
                        <p key={key}>
                          <strong>{key}:</strong> {value?.toString()}
                        </p>
                      ))}
                    </TableCell>
                    <TableCell>
                      {Object.entries(row.diffData ?? {}).map(([key, value]) => (
                        <p key={key}>
                          <strong>{key}:</strong> {`${String(value?.from)} -> ${String(value?.to)}`}
                        </p>
                      ))}
                    </TableCell>
                    <TableCell>
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
