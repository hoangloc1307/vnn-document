import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type Row,
  type SortingState,
  type VisibilityState,
} from '@tanstack/react-table';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DataTableColumnHeader } from '~/components/datatable/data-table-column-header';
import { DataTablePagination } from '~/components/datatable/data-table-pagination';
import { DataTableToolbar } from '~/components/datatable/data-table-toolbar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
  const { t } = useTranslation(['datatable']);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState<string>('');
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    // ===== Pipelines =====
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),

    // ===== State controlled =====
    state: { sorting, globalFilter, columnVisibility, rowSelection },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,

    // ===== Chỉ gán CHO GLOBAL =====
    globalFilterFn: (row: Row<TData>, _, filterValue: unknown): boolean => {
      const query = String(filterValue ?? '')
        .trim()
        .toLowerCase();
      if (!query) return true;

      return row.getAllCells().some((cell) => {
        const col = cell.column;
        if (col.columnDef.enableGlobalFilter === false) return false;

        const val = row.getValue(col.id);
        if (val == null) return false;

        const str = String(val).toLowerCase();
        return str.includes(query);
      });
    },

    defaultColumn: {
      enableSorting: true,
      enableGlobalFilter: true,
      header: '',
    },

    // Multi-sort
  });

  return (
    <div className='space-y-4'>
      {/* <==> TOOLBAR <==> */}
      <DataTableToolbar table={table} />

      {/* TABLE */}
      <div className='overflow-hidden rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  if (header.isPlaceholder)
                    return <TableHead key={header.id} colSpan={header.colSpan} />;

                  const title =
                    typeof header.column.columnDef.header === 'string'
                      ? (header.column.columnDef.header as string)
                      : flexRender(header.column.columnDef.header, header.getContext());

                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      <DataTableColumnHeader column={header.column} label={title} />
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className='h-24 text-center'>
                  {t('datatable:empty')}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* <==> PAGINATION <==> */}
      <DataTablePagination table={table} />
    </div>
  );
}
