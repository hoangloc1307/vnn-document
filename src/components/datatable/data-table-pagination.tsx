import type { Table } from '@tanstack/react-table';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '~/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({ table }: DataTablePaginationProps<TData>) {
  const { t } = useTranslation(['datatable']);
  const hasPagination = table.options.meta?.hasPagination;
  const page = table.getState().pagination.pageIndex + 1;
  const pageSize = table.getState().pagination.pageSize;
  const pageSizeOptions = table.options.meta?.pageSizeOptions;
  const totalPage = table.getPageCount();

  return (
    <div className='flex items-center justify-between'>
      {/* <==> ROW SELECTED <==> */}
      <div className='text-muted-foreground flex-1 text-sm'>
        {/* {t('datatable:selection.selectedCount', {
          count: table.getFilteredSelectedRowModel().rows.length,
          total: table.getFilteredRowModel().rows.length,
        })} */}
      </div>

      {/* <==> PAGINATION <==> */}
      {Boolean(hasPagination) && (
        <div className='flex items-center space-x-6 lg:space-x-8'>
          {/* <==> ROW PER PAGE <==> */}
          <div className='flex items-center space-x-2'>
            <p className='text-sm font-medium'>{t('datatable:pagination.rowsPerPage')}</p>
            <Select
              value={pageSize.toString()}
              onValueChange={(value) => table.setPageSize(Number(value))}
            >
              <SelectTrigger>
                <SelectValue placeholder={pageSize} />
              </SelectTrigger>
              <SelectContent side='top'>
                {pageSizeOptions?.map((pageSize) => (
                  <SelectItem key={pageSize} value={pageSize.toString()}>
                    {pageSize === Number.MAX_SAFE_INTEGER ? 'All' : pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* <==> PAGE COUNT <==> */}
          <div className='flex w-[100px] items-center justify-center text-sm font-medium'>
            {t('datatable:pagination.pageOf', { page, total: totalPage })}
          </div>

          {/* <==> NAVIGATE BUTTONS <==> */}
          <div className='flex items-center space-x-2'>
            {/* <==> PREVIOUS <==> */}
            <Button
              variant='outline'
              size='icon'
              title={t('datatable:pagination.first')}
              className='hidden size-8 lg:flex'
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronsLeft />
            </Button>

            {/* <==> PREVIOUS <==> */}
            <Button
              variant='outline'
              size='icon'
              title={t('datatable:pagination.prev')}
              className='size-8'
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeft />
            </Button>

            {/* <==> NEXT <==> */}
            <Button
              variant='outline'
              size='icon'
              title={t('datatable:pagination.next')}
              className='size-8'
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <ChevronRight />
            </Button>

            {/* <==> LAST <==> */}
            <Button
              variant='outline'
              size='icon'
              title={t('datatable:pagination.last')}
              className='hidden size-8 lg:flex'
              onClick={() => table.setPageIndex(totalPage - 1)}
              disabled={!table.getCanNextPage()}
            >
              <ChevronsRight />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
