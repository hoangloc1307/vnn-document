import { useSearchParams } from 'react-router-dom';
import DataTable from '~/components/datatable/data-table';
import { Button } from '~/components/ui/button';
import useDatatable from '~/hooks/datatable/useDatatable';
import { useGetCategory } from '~/hooks/queries/category/useGetCategory';
import { columns } from '~/pages/category/columns';
import CreateCategory from '~/pages/category/CreateCategory';

const PAGE_SIZE_OPTIONS = [15, 30, 50] as const;

export default function CategoryPage() {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;
  const pageSize = Number(searchParams.get('page-size')) || PAGE_SIZE_OPTIONS[0];
  const { data: categories, isFetching: categoryLoading } = useGetCategory();

  const table = useDatatable({
    columns,
    data: categories,
    pagination: {
      type: 'client',
      pageSizeOptions: [...PAGE_SIZE_OPTIONS],
      initial: { pageIndex: page - 1, pageSize },
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
          <Button variant={'outline'} onClick={() => table.setPageIndex(2)}>
            Import
          </Button>
          <CreateCategory />
        </div>
      </div>

      <div className='flex-1'>
        <DataTable table={table} loading={categoryLoading} />
      </div>
    </>
  );
}
