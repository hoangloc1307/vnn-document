import DataTable from '~/components/datatable/data-table';
import { Button } from '~/components/ui/button';
import useDatatable from '~/hooks/datatable/useDatatable';
import { useGetAllItems } from '~/hooks/queries/items';
import CreateCategory from '~/pages/category/CreateCategory';
import { itemColumns } from '~/pages/items/columns';

const PAGE_SIZE_OPTIONS = [15, 30, 50] as const;

export default function ItemsPage() {
  const { data: items, isFetching: itemsLoading } = useGetAllItems();

  const table = useDatatable({
    columns: itemColumns,
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
          <h2 className='text-2xl font-bold tracking-tight'>Items</h2>
          <p className='text-muted-foreground'>Here's a list of your items!</p>
        </div>

        <div className='flex flex-wrap justify-end gap-2'>
          <Button variant={'outline'} onClick={() => console.log('Import')}>
            Import
          </Button>
          <CreateCategory />
        </div>
      </div>

      <div className='flex-1'>
        <DataTable table={table} loading={itemsLoading} />
      </div>
    </>
  );
}
