import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
} from '@tanstack/react-table';
import { Fragment, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DataTableColumnHeader } from '~/components/datatable/data-table-column-header';
import { DataTablePagination } from '~/components/datatable/data-table-pagination';
import { DataTableToolbar } from '~/components/datatable/data-table-toolbar';
import { Input } from '~/components/ui/input';
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
  const [showFilters, setShowFilters] = useState(false);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState<string>('');
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: { sorting, globalFilter, columnVisibility, rowSelection, columnFilters },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onColumnFiltersChange: setColumnFilters,
    globalFilterFn: 'includesString',
    enableSorting: true,
    enableGlobalFilter: true,
    meta: {
      toggleFilters: () => setShowFilters((prev) => !prev),
    },
  });

  return (
    <div className='space-y-4'>
      {/* <==> TOOLBAR <==> */}
      <DataTableToolbar table={table} showFilters={showFilters} setShowFilters={setShowFilters} />

      {/* TABLE */}
      <div className='overflow-hidden rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <Fragment key={headerGroup.id}>
                <TableRow>
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

                {/* <==> FILTER ROW <==> */}
                {showFilters && (
                  <TableRow>
                    {headerGroup.headers.map((header) => {
                      const column = header.column;
                      if (!column.getCanFilter()) {
                        return <TableHead key={header.id} />;
                      }

                      return (
                        <TableHead key={header.id}>
                          <Input
                            type='text'
                            value={(column.getFilterValue() ?? '') as string}
                            onChange={(e) => column.setFilterValue(e.target.value)}
                          />
                        </TableHead>
                      );
                    })}
                  </TableRow>
                )}
              </Fragment>
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
