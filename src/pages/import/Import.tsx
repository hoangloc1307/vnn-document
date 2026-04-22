import { CheckIcon, XIcon } from 'lucide-react';
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

export default function ImportPage() {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation(['common', 'import']);

  const { data: importJob } = useGetImportByCode(id ?? '');

  return (
    <section>
      <div className='mb-2 flex items-baseline justify-between gap-2'>
        <div>
          <h2 className='text-2xl font-bold tracking-tight'>{'Import Commitment'}</h2>
          <p className='text-muted-foreground'>{'Review and confirm the import commitment'}</p>
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
    </section>
  );
}
