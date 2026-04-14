import { FileUpIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import DataTable from '~/components/datatable/data-table';
import { Button } from '~/components/ui/button';
import useDatatable from '~/hooks/datatable/useDatatable';
import { useGetAllItems } from '~/hooks/queries/useItems';
import { getItemColumns } from '~/pages/items/columns';
import CreateItemDialog from '~/pages/items/CreateItemDialog';

const PAGE_SIZE_OPTIONS = [15, 30, 50] as const;

export default function ItemsPage() {
  const { t } = useTranslation(['item']);
  const { data: items, isFetching: itemsLoading } = useGetAllItems();
  const columns = getItemColumns(t);

  const table = useDatatable({
    columns,
    data: items,
    pagination: {
      type: 'client',
      pageSizeOptions: [...PAGE_SIZE_OPTIONS],
    },
  });

  return (
    <>
      <div className='mb-2 flex items-baseline justify-between gap-2'>
        <div>
          <h2 className='text-2xl font-bold tracking-tight'>{t('title')}</h2>
          <p className='text-muted-foreground'>{t('description')}</p>
        </div>

        <div className='flex flex-wrap justify-end gap-2'>
          <Button variant={'outline'} size={'sm'} onClick={() => console.log('Import')}>
            <FileUpIcon /> Import
          </Button>
          <CreateItemDialog />
        </div>
      </div>

      <div className='flex-1'>
        <DataTable table={table} loading={itemsLoading} />
      </div>
    </>
  );
}
