import { flexRender, type Table as TableType } from '@tanstack/react-table';
import { Fragment, useRef } from 'react';
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

type DataTableProps<TData> = {
  table: TableType<TData>;
};

// const ROW_VIRTUAL_THRESHOLD = 5;
// const ESTIMATED_ROW_HEIGHT = 39;

export default function DataTable<TData>({ table }: DataTableProps<TData>) {
  const { t } = useTranslation(['datatable']);
  const parentRef = useRef<HTMLDivElement | null>(null);

  const fullScreen = table.options.meta?.fullScreen;
  const showFilters = table.options.meta?.showFilters;
  const emptyBody = Boolean(!table.getRowModel().rows?.length);
  // const visibleRows = table.getRowModel().rows;
  // const enableVirtual = visibleRows.length > ROW_VIRTUAL_THRESHOLD;

  // const rowVirtualizer = useVirtualizer({
  //   count: enableVirtual ? visibleRows.length : 0,
  //   getScrollElement: () => parentRef.current,
  //   estimateSize: () => ESTIMATED_ROW_HEIGHT,
  //   overscan: 8,
  // });

  // const virtualItems = rowVirtualizer.getVirtualItems();
  // const totalSize = rowVirtualizer.getTotalSize();

  return (
    <div
      className={cn(
        'space-y-2',
        fullScreen && 'bg-background fixed top-0 left-0 z-50 h-dvh w-dvw p-2',
      )}
    >
      {/* <==> TOOLBAR <==> */}
      <DataTableToolbar table={table} />

      {/* TABLE */}
      <div
        ref={parentRef}
        className={cn('overflow-auto rounded-md border', fullScreen && 'h-[calc(100dvh-100px)]')}
      >
        <Table>
          <TableHeader className='border-b [&_tr]:border-b-0'>
            {table.getHeaderGroups().map((headerGroup) => (
              <Fragment key={headerGroup.id}>
                <TableRow className='border-b-0'>
                  {headerGroup.headers.map((header) => {
                    if (header.isPlaceholder)
                      return (
                        <TableHead
                          key={header.id}
                          colSpan={header.colSpan}
                          style={{
                            width: header.column.getSize(),
                          }}
                        />
                      );

                    const title =
                      typeof header.column.columnDef.header === 'string'
                        ? (header.column.columnDef.header as string)
                        : flexRender(header.column.columnDef.header, header.getContext());
                    return (
                      <TableHead
                        key={header.id}
                        colSpan={header.colSpan}
                        style={{
                          width: header.column.getSize(),
                        }}
                      >
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
                        <TableHead key={header.id} className='p-2'>
                          <DataTableColumnFilter column={header.column} />
                        </TableHead>
                      );
                    })}
                  </TableRow>
                )}
              </Fragment>
            ))}
          </TableHeader>

          {/* <==> EMPTY BODY <==> */}
          {emptyBody && (
            <TableBody>
              <TableRow>
                <TableCell colSpan={table.getAllLeafColumns().length} className='h-24 text-center'>
                  {t('datatable:empty')}
                </TableCell>
              </TableRow>
            </TableBody>
          )}

          {/* <==> BODY WITH DATA <==> */}
          {!emptyBody && (
            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      style={{
                        width: cell.column.getSize(),
                      }}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </div>

      {/* <==> PAGINATION <==> */}
      <DataTablePagination table={table} />
    </div>
  );
}
