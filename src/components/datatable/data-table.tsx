import {
  flexRender,
  getCoreRowModel,
  getFacetedUniqueValues,
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
import DataTableColumnFilter from '~/components/datatable/data-table-column-filter';
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
import { cn } from '~/lib/utils';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
  const { t } = useTranslation(['datatable']);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [fullScreen, setFullScreen] = useState<boolean>(false);

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
    getFacetedUniqueValues: getFacetedUniqueValues(),
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
      showFilters,
      setShowFilters,
      showSearch,
      setShowSearch,
      fullScreen,
      setFullScreen,
    },
  });

  return (
    <div className={cn(fullScreen && 'fixed top-0 left-0 z-50 h-dvh w-dvw bg-white')}>
      {/* <==> TOOLBAR <==> */}
      <DataTableToolbar table={table} />

      {/* TABLE */}
      <div
        className={cn('overflow-y-auto rounded-md border', fullScreen && 'h-[calc(100dvh-100px)]')}
      >
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
                          <DataTableColumnFilter column={header.column} />
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
