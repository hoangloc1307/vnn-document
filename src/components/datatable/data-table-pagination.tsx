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
import { Tooltip, TooltipContent, TooltipTrigger } from '~/components/ui/tooltip';

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({ table }: DataTablePaginationProps<TData>) {
  const { t } = useTranslation(['datatable']);

  return (
    <div className='flex items-center justify-between p-2'>
      {/* ROW SELECTED */}
      <div className='text-muted-foreground flex-1 text-sm'>
        {t('datatable:selection.selectedCount', {
          count: table.getFilteredSelectedRowModel().rows.length,
          total: table.getFilteredRowModel().rows.length,
        })}
      </div>

      <div className='flex items-center space-x-6 lg:space-x-8'>
        {/* <==> ROW PER PAGE <==> */}
        <div className='flex items-center space-x-2'>
          <p className='text-sm font-medium'>{t('datatable:pagination.rowsPerPage')}</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className='h-8 w-[70px]'>
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side='top'>
              {[10, 20, 25, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* PAGE COUNT */}
        <div className='flex w-[100px] items-center justify-center text-sm font-medium'>
          {t('datatable:pagination.pageOf', {
            page: table.getState().pagination.pageIndex + 1,
            total: table.getPageCount(),
          })}
        </div>

        {/* NAVIGATE BUTTONS */}
        <div className='flex items-center space-x-2'>
          {/* <==> PREVIOUS <==> */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant='outline'
                size='icon'
                className='hidden size-8 lg:flex'
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              >
                <span className='sr-only'>{t('datatable:pagination.first')}</span>
                <ChevronsLeft />
              </Button>
            </TooltipTrigger>
            <TooltipContent>{t('datatable:pagination.first')}</TooltipContent>
          </Tooltip>

          {/* <==> PREVIOUS <==> */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant='outline'
                size='icon'
                className='size-8'
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <span className='sr-only'>{t('datatable:pagination.prev')}</span>
                <ChevronLeft />
              </Button>
            </TooltipTrigger>
            <TooltipContent>{t('datatable:pagination.prev')}</TooltipContent>
          </Tooltip>

          {/* <==> NEXT <==> */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant='outline'
                size='icon'
                className='size-8'
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <span className='sr-only'>{t('datatable:pagination.next')}</span>
                <ChevronRight />
              </Button>
            </TooltipTrigger>
            <TooltipContent>{t('datatable:pagination.next')}</TooltipContent>
          </Tooltip>

          {/* <==> LAST <==> */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant='outline'
                size='icon'
                className='hidden size-8 lg:flex'
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                <span className='sr-only'>{t('datatable:pagination.last')}</span>
                <ChevronsRight />
              </Button>
            </TooltipTrigger>
            <TooltipContent>{t('datatable:pagination.last')}</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}
