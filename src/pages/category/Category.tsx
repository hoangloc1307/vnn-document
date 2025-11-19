import DataTable from '~/components/datatable/data-table';
import { Button } from '~/components/ui/button';
import useDatatable from '~/hooks/datatable/useDatatable';
import { useGetCategory } from '~/hooks/queries/category/useGetCategory';
import { columns } from '~/pages/category/columns';
import CreateCategory from '~/pages/category/CreateCategory';

export default function CategoryPage() {
  const { data: categories, isFetching: categoryLoading } = useGetCategory();

  const table = useDatatable({
    columns,
    data: categories,
    pagination: {
      type: 'client',
      pageSizeOptions: [15, 30, 50],
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
          <CreateCategory />
        </div>
      </div>

      <div className='flex-1'>
        <DataTable table={table} loading={categoryLoading} />
      </div>
    </>
  );
}
