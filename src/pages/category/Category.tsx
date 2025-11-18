import DataTable from '~/components/datatable/data-table';
import { Button } from '~/components/ui/button';
import useDatatable from '~/hooks/datatable/useDatatable';
import { columns } from '~/pages/category/columns';
import { dataFake } from '~/pages/category/data';

export default function CategoryPage() {
  const table = useDatatable({
    columns,
    data: dataFake,
    pagination: {
      type: 'client',
      pageSizeOptions: [10, 25, 50],
    },
  });

  return (
    <>
      <div className='mb-2 flex items-baseline justify-between gap-2'>
        <div>
          <h2 className='text-2xl font-bold tracking-tight'>Categrory</h2>
          <p className='text-muted-foreground'>Here's a list of your asset category!</p>
        </div>

        <div className='flex flex-wrap justify-end gap-2'>
          <Button variant={'outline'}>Import</Button>
          <Button>Create Category</Button>
        </div>
      </div>

      <div className='flex-1'>
        <DataTable table={table} />
      </div>
    </>
  );
}
