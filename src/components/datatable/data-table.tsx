import { type Table as TableType } from '@tanstack/react-table';
import { useRef, type RefObject } from 'react';
import { DataTableBody } from '~/components/datatable/data-table-body';
import { DataTableHeader } from '~/components/datatable/data-table-header';
import { DataTablePagination } from '~/components/datatable/data-table-pagination';
import { DataTableToolbar } from '~/components/datatable/data-table-toolbar';
import { Table, TableContainer } from '~/components/ui/table';
import { cn } from '~/lib/utils';

type DataTableProps<TData> = {
  table: TableType<TData>;
  loading?: boolean;
};

export default function DataTable<TData>({ table, loading }: DataTableProps<TData>) {
  const fullScreen = table.options.meta?.fullScreen;
  const tableContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className={cn(
        'space-y-2',
        fullScreen && 'bg-background fixed top-0 left-0 z-50 h-dvh w-dvw p-2',
      )}
    >
      {/* <==> TOOLBAR <==> */}
      <DataTableToolbar table={table} />

      {/* <==> TABLE <==> */}
      <div
        className={cn('overflow-auto rounded-md border', fullScreen && 'h-[calc(100dvh-100px)]')}
      >
        <TableContainer ref={tableContainerRef} className='max-h-[calc(100dvh-100px)]'>
          <Table className='grid'>
            <DataTableHeader table={table} />
            <DataTableBody
              table={table}
              tableContainerRef={tableContainerRef as RefObject<HTMLDivElement>}
              loading={loading}
            />
          </Table>
        </TableContainer>
      </div>

      {/* <==> PAGINATION <==> */}
      <DataTablePagination table={table} />
    </div>
  );
}
