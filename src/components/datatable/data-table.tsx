import { type Table as TableType } from '@tanstack/react-table';
import { DataTableBody } from '~/components/datatable/data-table-body';
import { DataTableHeader } from '~/components/datatable/data-table-header';
import { DataTablePagination } from '~/components/datatable/data-table-pagination';
import { DataTableToolbar } from '~/components/datatable/data-table-toolbar';
import { Table } from '~/components/ui/table';
import { cn } from '~/lib/utils';

type DataTableProps<TData> = {
  table: TableType<TData>;
};

export default function DataTable<TData>({ table }: DataTableProps<TData>) {
  const fullScreen = table.options.meta?.fullScreen;

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
        className={cn(
          'relative h-[300px] max-h-[calc(100dvh-100px)] overflow-auto rounded-md border',
          fullScreen && 'h-[calc(100dvh-100px)]',
        )}
      >
        <Table>
          <DataTableHeader table={table} />
          <DataTableBody table={table} />
        </Table>
      </div>

      {/* <==> PAGINATION <==> */}
      <DataTablePagination table={table} />
    </div>
  );
}
