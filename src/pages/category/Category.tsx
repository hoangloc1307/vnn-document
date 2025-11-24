import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import DataTable from '~/components/datatable/data-table';
import { Button } from '~/components/ui/button';
import URL_PARAM_KEYS from '~/constants/urlParamKeys';
import useDatatable from '~/hooks/datatable/useDatatable';
import { useGetCategory } from '~/hooks/queries/category/useGetCategory';
import { columns } from '~/pages/category/columns';
import CreateCategory from '~/pages/category/CreateCategory';

const PAGE_SIZE_OPTIONS = [15, 30, 50] as const;

export default function CategoryPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: categories, isFetching: categoryLoading } = useGetCategory();

  const initialPage = useMemo(() => {
    const p = Number(searchParams.get(URL_PARAM_KEYS.PAGE_INDEX));
    return Number.isFinite(p) && p > 0 ? p : 1;
  }, [searchParams]);

  const initialPageSize = useMemo(() => {
    const s = Number(searchParams.get(URL_PARAM_KEYS.PAGE_SIZE));
    return Number.isFinite(s) && s > 0 ? s : PAGE_SIZE_OPTIONS[0];
  }, [searchParams]);

  const initialSorting = useMemo(() => {
    const sortParam = searchParams.get(URL_PARAM_KEYS.SORT);
    if (!sortParam) return [];

    return sortParam.split('.').map((p) => {
      const [id, dir] = p.split('_');
      return { id, desc: dir === 'desc' };
    });
  }, [searchParams]);

  const table = useDatatable({
    columns,
    data: categories,
    pagination: {
      type: 'client',
      pageSizeOptions: [...PAGE_SIZE_OPTIONS],
      initial: { pageIndex: initialPage - 1, pageSize: initialPageSize },
    },
    sorting: { initial: initialSorting },
  });

  const paginationState = table.getState().pagination;
  const sortingState = table.getState().sorting;

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const sort = sortingState.map((s) => `${s.id}_${s.desc ? 'desc' : 'asc'}`).join('.');
    if (sort) {
      params.set(URL_PARAM_KEYS.SORT, sort);
    } else {
      params.delete(URL_PARAM_KEYS.SORT);
    }
    params.set(URL_PARAM_KEYS.PAGE_INDEX, String(paginationState.pageIndex + 1));
    params.set(URL_PARAM_KEYS.PAGE_SIZE, String(paginationState.pageSize));
    setSearchParams(params, { replace: true });
  }, [paginationState, searchParams, setSearchParams, sortingState]);

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
