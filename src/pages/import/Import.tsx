import { ArrowLeftIcon, CheckIcon, EyeOffIcon, XIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '~/components/ui/button';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '~/components/ui/empty';
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

export default function ImportPage() {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation(['common', 'import']);
  const navigate = useNavigate();

  const { data: importJob, isError } = useGetImportByCode(id ?? '');

  return (
    <section>
      <div className='mb-2 flex items-baseline justify-between gap-2'>
        <div>
          <h2 className='text-2xl font-bold tracking-tight'>{t('import:importCommitment')}</h2>
          <p className='text-muted-foreground'>{t('import:reviewAndConfirm')}</p>
        </div>

        {!isError && (
          <div className='flex flex-wrap justify-end gap-2'>
            <Button size={'sm'} variant={'outline'}>
              <XIcon /> {t('common:cancel')}
            </Button>

            <Button size={'sm'}>
              <CheckIcon /> {t('common:confirm')}
            </Button>
          </div>
        )}
      </div>

      {isError && (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant='icon'>
              <EyeOffIcon />
            </EmptyMedia>
            <EmptyTitle>{t('import:noImportAvailable')}</EmptyTitle>
            <EmptyDescription className='max-w-xs text-pretty'>
              {t('import:importJobNotFoundOrExpired')}
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button variant='outline' onClick={() => navigate('/')}>
              <ArrowLeftIcon />
              {t('import:backToHome')}
            </Button>
          </EmptyContent>
        </Empty>
      )}

      {!isError && (
        <>
          <div>
            <TableContainer className='w-full overflow-auto'>
              <Table>
                <TableHeader>
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

          <div className='mt-5'>
            <TableContainer className='w-full overflow-auto'>
              <Table className='table-fixed'>
                <TableHeader>
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
                            <strong>{key}:</strong>{' '}
                            {`${String(value?.from)} -> ${String(value?.to)}`}
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
        </>
      )}
    </section>
  );
}
